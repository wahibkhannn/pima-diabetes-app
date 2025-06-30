mport React, { useState } from 'react';
import axios from 'axios';

const DiabetesPredictor = () => {
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError(null);

    try {
      const cleanedData = Object.fromEntries(
        Object.entries(formData).map(([key, val]) => [key, parseFloat(val)])
      );
      const response = await axios.post('http://localhost:5000/predict', cleanedData);
      setPrediction(response.data.prediction);
    } catch (err) {
      setError(err.response?.data?.error || 'Prediction failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white font-sans">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6 drop-shadow-md tracking-wider">
          🔮 Diabetes Prediction App
        </h2>



          <div className="col-span-2 text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-md hover:shadow-cyan-200/20 transition transform duration-200"
              disabled={loading}
            >
              {loading ? 'Predicting...' : '🚀 Predict Now'}
            </button>
          </div>
        </form>

        {prediction !== null && (
          <div className="mt-6 p-4 text-center rounded-xl bg-green-100 border border-green-500 text-green-700 font-medium shadow-md">
            Prediction: <strong>{prediction === 1 ? '🩺 Diabetic' : '✅ Not Diabetic'}</strong>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 text-center rounded-xl bg-red-100 border border-red-500 text-red-700 font-medium shadow-md">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiabetesPredictor;




// import React, { useState } from 'react';
// import axios from 'axios';

// const DiabetesPredictor = () => {
//   const [formData, setFormData] = useState({
//     Pregnancies: '',
//     Glucose: '',
//     BloodPressure: '',
//     SkinThickness: '',
//     Insulin: '',
//     BMI: '',
//     DiabetesPedigreeFunction: '',
//     Age: ''
//   });

//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setPrediction(null);
//     setError(null);

//     try {
//       const cleanedData = Object.fromEntries(
//         Object.entries(formData).map(([key, val]) => [key, parseFloat(val)])
//       );
//       const response = await axios.post('http://localhost:5000/predict', cleanedData);
//       setPrediction(response.data.prediction);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Prediction failed.');
//       console.error(err); // error during prediction
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
//       <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
//         <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Diabetes Prediction App</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//           {Object.entries(formData).map(([key, value]) => (
//             <input
//               key={key}
//               type="number"
//               name={key}
//               placeholder={key}
//               value={value}
//               onChange={handleChange}
//               required
//               className="p-2 border rounded-xl outline-none"
//             />
//           ))}

//           <div className="col-span-2 text-center">
//             <button
//               type="submit"
//               className="bg-black text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
//               disabled={loading}
//             >
//               {loading ? 'Predicting...' : 'Predict'}
//             </button>
//           </div>
//         </form>

//         {prediction !== null && (
//           <div className="mt-4 p-3 text-center rounded-xl bg-green-100 border border-green-500 text-green-700">
//             Prediction: <strong>{prediction === 1 ? 'Diabetic' : 'Not Diabetic'}</strong>
//           </div>
//         )}

//         {error && (
//           <div className="mt-4 p-3 text-center rounded-xl bg-red-100 border border-red-500 text-red-700">
//             Error: {error}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DiabetesPredictor;