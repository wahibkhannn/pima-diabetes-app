# import os
# import pandas as pd
# import numpy as np
# from flask import request, jsonify
# from config import REQUIRED_FEATURES, REAL_TIME_PREDICTIONS_PATH
# from model_utils.data_utils import validate_input

# from app import app

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json() #reads the incoming JSON data from the request body. #stores it in data (a dict)
#         '''why here ? We need user input- & flask APIs recieve data from the frontend in JSON format (via POST)'''
#         print("📥 Received data:", data)
#         validate_input(data, REQUIRED_FEATURES)
#         # converts input dictionary into array
#         input_data = np.array([data[feature] for feature in REQUIRED_FEATURES]).reshape(1,-1)
#         #make prediction - passes the cleaned reshaped input into trained model
#         prediction = model.predict(input_data) 
#         #save this prediction into a file
#         record = {**data, "Prediction": int(prediction[0])} #{**data...} creates a "new copy" of the dictionary safely
#         # this is called dictionary unpacking - it merges the input data (like BMI, glucose, age etc) with the prediction into a single dictionary
#         # log this prediction- storing input +prediction together (real-time logs)
#         os.makedirs("data", exist_ok=True) # makes a folder named data- bcz we wanna save the prediction into a file, and the folder must exist
#         file_exists = os.path.isfile(REAL_TIME_PREDICTIONS_PATH)  #checks if this file exists, we ll "append without writing headers"
#         df = pd.DataFrame([record]) # creates a pandas df from the single record dictionary
#         #header=not file_exists - writes header only if file didnt already exist
#         df.to_csv(REAL_TIME_PREDICTIONS_PATH, mode='a', header=not file_exists, index=False) #appends the new prediction to the csv file
#         ''' you are maintaining a live record fo all predictions - helpful for i) auditing ii) debugging iii) analytics later'''
#         return jsonify({'prediction': int(prediction[0])})  # sends back a JSON response like:
#         # {
#         #   "prediction": 1
#         # }
#     except Exception as e:
#         return jsonify({'error': str(e)}), 400 

import os
import pandas as pd
import numpy as np
from flask import request, jsonify
from config import REQUIRED_FEATURES, REAL_TIME_PREDICTIONS_PATH
from model_utils.data_utils import validate_input

def register_predict_route(app, model):
    @app.route('/predict', methods=['POST'])
    def predict():
        try:
            data = request.get_json()
            print("📥 Received data:", data)
            validate_input(data, REQUIRED_FEATURES)
            input_data = np.array([data[feature] for feature in REQUIRED_FEATURES]).reshape(1, -1)
            prediction = model.predict(input_data)
            record = {**data, "Prediction": int(prediction[0])}
            os.makedirs("data", exist_ok=True)
            file_exists = os.path.isfile(REAL_TIME_PREDICTIONS_PATH)
            df = pd.DataFrame([record])
            df.to_csv(REAL_TIME_PREDICTIONS_PATH, mode='a', header=not file_exists, index=False)
            return jsonify({'prediction': int(prediction[0])})
        except Exception as e:
            return jsonify({'error': str(e)}), 400
