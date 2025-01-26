import React, { useState } from 'react';
import '../App.css';

const Disease = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setLoading(true);
      setTimeout(() => {
        setResult('Powdery Mildew detected on Tomato leaves.');
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="diseasedet">
      <div className="content-container">
        <h1 className="title">Crop Disease Detection</h1>
        <p className="description">
          Identify diseases in your crops by uploading images for analysis. Follow the
          instructions below to submit your images and receive results:
        </p>
        <ul className="instruction-list">
          <li>Ensure your image is clear and focused on the affected area of the crop.</li>
          <li>Upload images in JPEG or PNG format.</li>
          <li>Click on the "Upload Image" button below to select your file.</li>
          <li>Wait a few moments for the analysis results to be generated.</li>
        </ul>

        <div className="upload-container">
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            aria-label="Upload image for crop disease detection"
          />
          <label
            htmlFor="fileUpload"
            className="upload-button"
          >
            Upload Image
          </label>
          <p className="upload-text">or drag and drop your file here</p>
        </div>

        {loading && (
          <div className="text-center">
            <p>Analyzing...</p>
            <div className="spinner mt-2">🔄</div>
          </div>
        )}

        {!loading && result && (
          <div className="result-container">
            <h2 className="recent-results-title">Analysis Result</h2>
            <div className="result-card">
              <p className="result-text">{result}</p>
            </div>
          </div>
        )}

        {image && !loading && (
          <div className="result-container">
            <h2 className="recent-results-title">Uploaded Image</h2>
            <img src={image} alt="Uploaded Crop" className="result-image" />
          </div>
        )}

        <h2 className="recent-results-title">Recent Analysis Results</h2>
        <div className="results-container">
          <div className="result-card">
            <img
              src="https://via.placeholder.com/150"
              alt="Powdery Mildew on Tomato leaves"
              className="result-image"
            />
            <p className="result-text">
              Powdery Mildew detected on Tomato leaves.
            </p>
          </div>
          <div className="result-card">
            <img
              src="https://via.placeholder.com/150"
              alt="Brown Spot on Rice plants"
              className="result-image"
            />
            <p className="result-text">
              Brown Spot disease identified on Rice plants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disease;