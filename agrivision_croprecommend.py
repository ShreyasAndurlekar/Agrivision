!apt-get update
!apt-get install -y tesseract-ocr
!pip install pytesseract pillow transformers torch scikit-learn pandas numpy matplotlib requests plotly flask

from datetime import datetime, timedelta
from PIL import Image
import pytesseract
import re
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
import joblib
import matplotlib.pyplot as plt
import plotly.express as px
import plotly.graph_objects as go
import requests
from flask import Flask, request, render_template, send_file

# Set the tesseract command path
pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'

# Function to fetch seasonal weather data from the API
def fetch_seasonal_data(latitude, longitude):
    url = f"https://seasonal-api.open-meteo.com/v1/seasonal?latitude={latitude}&longitude={longitude}&six_hourly=temperature_2m,precipitation,relative_humidity_2m&forecast_days=183"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching data: {response.status_code}")
        return None

# Function to multiply rainfall value by 1000
def convert_rainfall_value(rainfall_value):
    return rainfall_value * 1000

# Function to perform OCR on image
def ocr_image(image_path):
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    return text

# Function to extract soil data using regular expressions
def extract_soil_data(ocr_text):
    patterns = {
        'Nitrogen': r'(Available Nitrogen|Nitrogen|N)\s*\(.*?\)\s*(\d+)\s*(kg/ha|mg-N/kg)',
        'Phosphorus': r'(Available Phosphorus|Phosphorus|P)\s*\(.*?\)\s*(\d+)\s*(kg/ha|mg-N/kg)',
        'Potassium': r'(Available Potassium|Potassium|K)\s*\(.*?\)\s*(\d+)\s*(kg/ha|mg-N/kg)',
        'pH': r'(pH)\s*\(.*?\)\s*(\d+(\.\d+)?)'
    }
    extracted_data = {}
    units = {}
    for nutrient, pattern in patterns.items():
        match = re.search(pattern, ocr_text, re.IGNORECASE)
        if match:
            extracted_data[nutrient] = float(match.group(2)) if nutrient == 'pH' else int(match.group(2))
            if nutrient != 'pH':
                units[nutrient] = match.group(3)
    
    if 'pH' not in extracted_data:
        extracted_data['pH'] = 6.5  # Default pH value
    
    return extracted_data, units

# Function to validate soil data
def validate_soil_data(soil_data, units):
    if soil_data is None:
        print("Error: Soil data is None.")
        return None
    for key in soil_data:
        if key != 'pH':  # Skip pH conversion
            if units[key] == 'kg/ha':
                soil_data[key] = soil_data[key] * (1000 / 1500)  # Convert kg/ha to mg-N/kg
            elif units[key] == 'mg-N/kg':
                soil_data[key] = soil_data[key]  # Already in mg-N/kg
    return soil_data

# Class to handle crop recommendation model
class CropRecommendationModel:
    def __init__(self):
        self.model_rf = None
        self.model_gb = None
        self.scaler = None
        self.unique_crops = None

    def load_dataset(self, file_path):
        try:
            dataset = pd.read_csv(file_path)
            print("Dataset loaded successfully!")
            return dataset
        except Exception as e:
            print(f"Error loading dataset: {e}")
            return None

    def train_model(self, dataset):
        features = dataset[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
        labels = dataset['label']
        X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

        scaler = MinMaxScaler()
        X_train_scaled = scaler.fit_transform(X_train)

        model_rf = RandomForestClassifier(n_estimators=100, random_state=42)
        model_rf.fit(X_train_scaled, y_train)

        model_gb = GradientBoostingClassifier(n_estimators=100, random_state=42)
        model_gb.fit(X_train_scaled, y_train)

        model_components = {
            'model_rf': model_rf,
            'model_gb': model_gb,
            'scaler': scaler,
            'unique_crops': labels.unique()
        }

        return model_components

    def save_model(self, model_components, save_path):
        joblib.dump(model_components, save_path)
        print(f"Model saved to {save_path}")

# Class to handle crop recommendations based on the model
class CropRecommendationPredictor:
    def __init__(self, model_components):
        self.model_rf = model_components['model_rf']
        self.model_gb = model_components['model_gb']
        self.scaler = model_components['scaler']
        self.unique_crops = model_components['unique_crops']

    def get_crop_recommendations(self, input_data, dataset):
        features = dataset[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
        features_normalized = self.scaler.transform(features)

        input_features = np.array([input_data['N'], input_data['P'], input_data['K'],
                                   input_data['temperature'], input_data['humidity'],
                                   input_data['ph'], input_data['rainfall']])
        input_normalized = self.scaler.transform([input_features])[0]

        distances = np.linalg.norm(features_normalized - input_normalized, axis=1)
        affinity_scores = 1 / (1 + distances)
        dataset['affinity_score'] = affinity_scores

        yield_scores_rf = dataset.groupby('label')['affinity_score'].sum()
        max_score_rf = yield_scores_rf.max()
        scaled_scores_rf = (yield_scores_rf / max_score_rf) * 95

        yield_scores_gb = dataset.groupby('label')['affinity_score'].sum()
        max_score_gb = yield_scores_gb.max()
        scaled_scores_gb = (yield_scores_gb / max_score_gb) * 95

        combined_scores = (scaled_scores_rf + scaled_scores_gb) / 2
        remaining_percentage = 5
        combined_scores = combined_scores.sort_values(ascending=False)
        remaining_scores = (combined_scores / combined_scores.sum()) * remaining_percentage
        final_scores = combined_scores + remaining_scores

        top_4_crops = final_scores.sort_values(ascending=False).head(4)

        return top_4_crops

    def visualize_recommendations(self, recommendations):
        # Pie Chart
        plt.figure(figsize=(10, 6))
        plt.pie(recommendations, labels=recommendations.index, autopct='%1.1f%%', startangle=140)
        plt.title('Crop Yield Potential')
        plt.axis('equal')
        plt.tight_layout()
        plt.savefig('crop_yield_potential_pie_chart.png')
        plt.show()

        # Bar Chart
        fig = px.bar(recommendations, x=recommendations.index, y=recommendations.values, labels={'x': 'Crop', 'y': 'Yield Potential (%)'}, title='Crop Yield Potential Comparison')
        fig.update_layout(xaxis_title='Crop', yaxis_title='Yield Potential (%)')
        fig.write_image('crop_yield_potential_bar_chart.png')
        fig.show()

# Function to run the Flask app
def run_flask_app():
    app = Flask(__name__)

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/predict', methods=['POST'])
    def predict():
        data = request.form
        input_data = {
            'N': float(data['N']),
            'P': float(data['P']),
            'K': float(data['K']),
            'temperature': float(data['temperature']),
            'humidity': float(data['humidity']),
            'ph': float(data['ph']),
            'rainfall': float(data['rainfall'])
        }

        # Load the model components from the local system
        model_components = joblib.load('crop_recommendation_model.pkl')
        predictor = CropRecommendationPredictor(model_components)
        dataset = pd.read_csv('recommend_vision.csv')

        top_4_crops = predictor.get_crop_recommendations(input_data, dataset)
        
        # Generate visualizations
        predictor.visualize_recommendations(top_4_crops)
        
        return render_template('result.html', crops=top_4_crops.to_dict(), img_pie='crop_yield_potential_pie_chart.png', img_bar='crop_yield_potential_bar_chart.png')

    app.run(debug=True)

# Run the Flask app
run_flask_app()