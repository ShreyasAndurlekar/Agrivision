from flask import Flask, render_template, request, send_file, make_response
from werkzeug.utils import secure_filename
import io
import os
from flask_cors import CORS

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
        # Process file in memory
        file_stream = io.BytesIO(file.read())
        
        # Return image from memory
        image_stream = io.BytesIO()
        with open('images/kash.jpeg', 'rb') as img:
            image_stream.write(img.read())
        image_stream.seek(0)
        
        return send_file(
            image_stream,
            mimetype='image/jpeg',
            as_attachment=True,
            download_name='response.jpg'
        )

if __name__ == '__main__':
    app.run(debug=True, port=5000)