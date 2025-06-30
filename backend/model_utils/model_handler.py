from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import os 
import pandas as pd 
from config import MODEL_PATH, ONLINE_DATA_PATH
from model_utils.data_utils import fetch_save_data

def train_and_save_model():
    '''Training'''
    if not os.path.exists(ONLINE_DATA_PATH):
        data = fetch_save_data()
    else:
        data = pd.read_csv(ONLINE_DATA_PATH)
    X = data.drop(columns = ['Outcome']) # feature matrix containing all input features except'- Outcome
    y = data['Outcome'] # target vector Y - the output, which is whether the person has diabetes or not ( range 0-1)

    #splitting the dataset into training and testing sets:
    #test-size=0.2 -> 20% of data is used for testing
    #random_state = 42 -> seed value that ensures reproducibility of the split. when train_test_split splits the data, it shuffles it randomly before splitting.
    #if u dont set random state, u ll get a different split every time u run the code.Setting it ensures that the same shuffle & split happen every time which is useful for: debugging, model comparison & reproducibilty of exper
    # u cant take any random value but most people take it as a JOKE - The Hitchhiker's guide to the Galaxy- so 42 "ans to life"
    # U study 80% of the syllabus - u leave 20% untouched for the testing ...the mock test using the 20%

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # now as we have trained the model till now-
    #Evaluate the model 

    y_pred = model.predict(X_test) #predict() - method to make predictions # X_test -> the test "feature set" (without labels)
    #meaning of above - "use the trained model to make predictions onunseen data"

    accuracy = accuracy_score(y_test, y_pred) #accuracy_score is a func from sklearn.metrics
    # y-test -> the *true lables* (ground truth)
    # y-pred -> the model's predicted labels # means- "compare the predicted values & compute how many were correct "
    print(f"Model accuracy: {accuracy:.4f}")

    #save the model into a file so we can load & reuse it later - no need to train again - saves it in Binary Format .pkl, .sav
    joblib.dump(model, MODEL_PATH) # saves any Python object to disk
    print(f" Model is saved to {MODEL_PATH}")

#function usage - to retrieve the saved model
def load_model():
    if not os.path.exists(MODEL_PATH):
        print("Model not found , Training a new model!!")
        train_and_save_model()  #if model is missing, u re-train it.

    return joblib.load(MODEL_PATH) # loads & returns the model file from disk


#calls the function - loads the model from disk if it exists, otherwise trains and saves it.
# "before doing anything else, I want to make sure I have a model ready in my hands to work with"

