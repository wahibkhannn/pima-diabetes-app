import os
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
import joblib
from config import REAL_TIME_PREDICTIONS_PATH, REQUIRED_FEATURES,BATCH_PREDICTIONS_PATH
from model_utils.model_handler import load_model
import logging
from datetime import datetime 
from flask_cors import CORS
from routes.predict import register_predict_route
app = Flask(__name__)
CORS(app) #Enables Cross-Origin Resource Sharing (CORS) for the Flask app, allowing it to accept requests from different origins.

model = load_model()
register_predict_route(app, model)


@app.route('/')
def home():
    return 'API is up and running! Use /predict or /batch-predict endpoints with POST requests.'



@app.route('/batch-predict', methods=['POST'])
def batch_predict():
    try:
        #check if file is provided
        if 'file' not in request.files:
            return jsonify({'error':'no file uploaded'}), 400
        file = request.files['file']
        batch_data = pd.read_csv(file)

        #validating input
        missing_features = [feature for feature in REQUIRED_FEATURES if feature not in batch_data]
        if missing_features:
            return jsonify({'error':f"missing features in batch file: {','.join(missing_features)}"}), 400
        
        # make predictions
        X = batch_data[REQUIRED_FEATURES]
        predictions = model.predict(X)

        # save the data into a new file 
        batch_data['Prediction'] = predictions
        os.makedirs("data", exist_ok=True)
        batch_data.to_csv(BATCH_PREDICTIONS_PATH, index=False)
        return jsonify({'message': 'Batch predictions are saved', 'output_file': BATCH_PREDICTIONS_PATH})
    except Exception as e:
        return jsonify({'error':str(e)}), 400

 
os.makedirs("logs", exist_ok=True) #creates a logs folder if it doesnt exist
logging.basicConfig(
    filename="logs/app.log", 
    level=logging.INFO,
    format='%(asctime)s - %(lineno)d - %(levelname)s - %(message)s',
  
    )
# logging.info("Model loaded successfully")
# logging.error("Something went wrong")

if __name__ == '__main__':
    app.run(debug=True)
