import os 
import pandas as pd 
from config import REQUIRED_FEATURES, ONLINE_DATA_PATH

def fetch_save_data():
    '''Fetch the dataset from an online API'''
    url = 'https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv'
    column = REQUIRED_FEATURES + ['Outcome']
    data = pd.read_csv(url, header=None, names = column)
    os.makedirs("data", exist_ok=True)
    data.to_csv(ONLINE_DATA_PATH, index=False)
    print("Dataset downloaded and saved into data folder")
    return data


''' validate_input(): What if a user forgets to send one of the necessary fields? So that's why I need to catch that early before passing it 
    to the model - otherwise it ll crash or give wrong results. It's defensive coding.
'''
def validate_input(data, required_features):
    '''validate input data for missing features'''
    missing_features = [feature for feature in required_features if feature not in data] 
    # this uses a list comprehension to build  a list of any required features that are missing from the input.
    if missing_features:
        raise ValueError(f'Missing feature: {','.join(missing_features)}')