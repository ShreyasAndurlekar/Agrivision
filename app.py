from flask import Flask, render_template, request, send_file, jsonify
from werkzeug.utils import secure_filename
import io
import os
from flask_cors import CORS
from PIL import Image, ImageDraw  # For generating random images
import random  # For random color generation

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*",  # Allow all origins
        "methods": ["POST", "OPTIONS"],  # Allow POST and preflight
        "allow_headers": ["Content-Type"]
    }
})

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create uploads directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_random_image():
    """
    Generates a random image using Pillow (PIL).
    Returns: A BytesIO object containing the image.
    """
    # Create a blank image with random background color
    width, height = 200, 200
    background_color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
    image = Image.new("RGB", (width, height), background_color)
    
    # Draw something on the image (optional)
    draw = ImageDraw.Draw(image)
    text = "Random Image"
    text_color = (255, 255, 255)  # White text
    draw.text((10, 10), text, fill=text_color)
    
    # Save the image to a BytesIO buffer
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    buffer.seek(0)  # Move the buffer's cursor to the beginning
    return buffer

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/upload", methods=['POST', 'OPTIONS'])
def upload_file():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Process file and return image
    image_path = 'images/kash.jpeg'
    return send_file(
        image_path,
        mimetype='image/jpeg',
        as_attachment=False  # This will display instead of download
    )

if __name__ == '__main__':
    app.run(debug=True, port=5000)
