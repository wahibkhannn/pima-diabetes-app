import React, { useState } from 'react';
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
      <div
  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-2xl"
  style={{
    boxShadow:
      'inset 0 0 20px rgba(255, 255, 255, 0.06), 0 10px 25px rgba(0,0,0,0.3)',
  }}
>

      {/* <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-2xl" style={{ boxShadow: 'inset 5px 5px 20px 2px rgba(255, 255, 255, 0.2)' }}> */}
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-md tracking-wider hover:text-gray-300 transition-all duration-200
">
          🔮 Diabetes Prediction App
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          <input
            type="number"
            name="Pregnancies"
            placeholder="Pregnancies (count)"
            value={formData.Pregnancies}
            onChange={handleChange}
            required
            className="bg-white/20 text-white placeholder-gray-300 p-3 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-inner"
          />
          <input
            type="number"
            name="Glucose"
            placeholder="Glucose (mg/dL)"
            value={formData.Glucose}
            onChange={handleChange}
            required
            className="bg-white/20 text-white placeholder-gray-300 p-3 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-inner"
          />
          <input
            type="number"
            name="BloodPressure"
            placeholder="Blood Pressure (mm Hg)"
            value={formData.BloodPressure}
            onChange={handleChange}
            required
            className="bg-white/20 text-white placeholder-gray-300 p-3 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-inner"
          />
          <input
            type="number"
            name="SkinThickness"
            placeholder="Skin Thickness (mm)"
            value={formData.SkinThickness}
            onChange={handleChange}
            required
            className="bg-white/20 text-white placeholder-gray-300 p-3 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-inner"
          />
          <input
            type="number"
            name="Insulin"
            placeholder="Insulin (μU/mL)"
            value={formData.Insulin}
            onChange={handleChange}
            required
            className="bg-white/20 text-white placeholder-gray-300 p-3 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-inner"
          />
          <input
            type="number"
            name="BMI"
            placeholder="BMI (kg/m²)"
            value={formData.BMI}
            onChange={handleChange}
            required
            className="bg-white/20 text-white placeholder-gray-300 p-3 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-inner"
          />
          <input
            type="number"
            name="DiabetesPedigreeFunction"
            placeholder="Diabetes Pedigree Function"
            value={formData.DiabetesPedigreeFunction}
            onChange={handleChange}
            required
            className="bg-white/20 text-white placeholder-gray-300 p-3 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-inner"
          />
          <input
            type="number"
            name="Age"
            placeholder="Age (years)"
            value={formData.Age}
            onChange={handleChange}
            required
            className="bg-white/20 text-white placeholder-gray-300 p-3 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-inner"
          />



          <div className="col-span-2 text-center">
            <button
              type="submit"
              className="bg-gradient-to-br from-black via-zinc-900 to-neutral-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-md hover:shadow-neutral-200/50 transition-all duration-200 ease-in-out"

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
        
        <div className="mt-8 border-t border-cyan-700/30 pt-4 text-center">    
        <p className="text-sm text-cyan-400 tracking-wide italic drop-shadow-sm">
          Made with ❤️ by <span className="font-semibold text-white">Wahib</span>
        </p>
      </div>
      </div>
      <div>
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