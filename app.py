from flask import Flask, render_template, request, send_file
from werkzeug.utils import secure_filename
import io
import os
from flask_cors import CORS
from PIL import Image, ImageDraw  # For generating random images
import random  # For random color generation

app = Flask(__name__)
CORS(app)

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

@app.route("/upload", methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    
    if file and allowed_file(file.filename):
        # Process file in memory (no changes here)
        file_stream = io.BytesIO(file.read())
        
        # Generate a random image
        image_stream = generate_random_image()
        
        # Return the generated image as a response
        return send_file(
            image_stream,
            mimetype='image/png',  # Use PNG for dynamically generated images
            as_attachment=True,
            download_name='random_image.png'
        )

if __name__ == '__main__':
    app.run(debug=True, port=5000)
