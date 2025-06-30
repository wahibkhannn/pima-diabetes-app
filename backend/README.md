# 🩺 Pima Indian Diabetes Prediction App

A full-stack Machine Learning app that predicts the likelihood of diabetes using the Pima Indian dataset. Built with:

- ⚙️ Flask (Python backend)
- 📊 Random Forest Classifier
- 💅 Tailwind CSS + React (frontend)
- 🧠 Trained model on real data
- 🧪 API tested via Postman

---

## 🌐 Usage

- Fill in health values on the React frontend.
- Click "Predict Now" to get your result.
- Result stored in backend logs and displayed instantly.

---

## 🔧 Tech Stack

- Frontend: React + Tailwind CSS
- Backend: Flask + Scikit-learn
- Deployment: Localhost (future: Render/Heroku + Netlify)

---

## 📊 About the Dataset

The **Pima Indian Diabetes Dataset** is a medical dataset from the National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK), containing diagnostic data collected from **768 women** of Pima Indian heritage near Phoenix, Arizona (USA).  
Its goal is to predict the onset of **Type 2 Diabetes Mellitus (T2DM)** based on lifestyle and physiological metrics.

- 🔬 **Total Records**: 768  
- 🧪 **Positive Cases**: 258 | **Negative Cases**: 500  
- 📍 **Study Period**: Ongoing since 1965 at 2-year intervals  
- ⚠️ **Target**: Binary outcome (1 = Diabetic, 0 = Non-diabetic)

### 📥 Features Used

| Feature                    | Description                              | Unit              |
|---------------------------|------------------------------------------|-------------------|
| `Pregnancies`             | Number of pregnancies                    | count             |
| `Glucose`                 | Plasma glucose concentration (OGTT)      | mg/dL             |
| `BloodPressure`           | Diastolic blood pressure                  | mm Hg             |
| `SkinThickness`           | Triceps skin fold thickness              | mm                |
| `Insulin`                 | 2-Hour serum insulin                      | μU/mL             |
| `BMI`                     | Body Mass Index                          | kg/m²             |
| `DiabetesPedigreeFunction`| Diabetes heredity function                | (no unit)         |
| `Age`                     | Age of the patient                       | years             |

---

## 🚀 How to Run

```bash
# Backend
cd backend
python app.py

# In new terminal
cd frontend
npm install
npm start










"The Pima Indian Diabetes Dataset, originally from the National Institute of Diabetes and Digestive and Kidney Diseases, contains information of 768 women from a population near Phoenix, Arizona, USA. The outcome tested was Diabetes, 258 tested positive and 500 tested negative. Therefore, there is one target (dependent) variable and the 8 attributes (TYNECKI, 2018): pregnancies, OGTT(Oral Glucose Tolerance Test), blood pressure, skin thickness, insulin, BMI(Body Mass Index), age, pedigree diabetes function. The Pima population has been under study by the National Institute of Diabetes and Digestive and Kidney Diseases at intervals of 2 years since 1965. As epidemiological evidence indicates that T2DM results from interaction of genetic and environmental factors, the Pima Indians Diabetes Dataset includes information about attributes that could and should be related to the onset of diabetes and its future complications."


📌 Credits
Dataset from: National Institute of Diabetes and Digestive and Kidney Diseases

Styling: Tailwind CSS

Dev: Wahib Khan

