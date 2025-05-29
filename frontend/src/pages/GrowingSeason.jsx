import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CropSelector = () => {
  const cropsList = ['Rice', 'Wheat', 'Barley', 'Sugarcane', 'Potato', 'Tomato', 'Mustard', 'Peanut'];
  const [season, setSeason] = useState('');
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  const fetchUserData = async () => {
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay

    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post("http://localhost:5000/user/profile", {}, header);
      setData(res.data.data);
      console.log("User Data Fetched", res);
    } catch (err) {
      console.error("Error while fetching data", err);
      setError("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleCheckboxChange = (crop) => {
    setSelectedCrops(prev =>
      prev.includes(crop) ? prev.filter(c => c !== crop) : [...prev, crop]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    setError('');

    if (selectedCrops.length === 0 || !season) {
      setStatus('⚠️ Please select a season and at least one crop.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/season', {
        seasonName: season,
        crops: selectedCrops,
        user: data.id
      });

      setStatus('✅ Crops submitted successfully!');
      navigate("/timeline");
    } catch (err) {
      console.error(err);
      setStatus('❌ Error submitting crops.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Crop Selector</h2>

        <label htmlFor="season" className="block text-lg font-semibold mb-2 text-gray-600">
          Select Season
        </label>
        <select
          id="season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 text-gray-500 rounded-lg focus:ring-2 focus:ring-green-400"
        >
          <option value="">-- Choose a Season --</option>
          <option value="Rabi">Rabi</option>
          <option value="Kharif">Kharif</option>
          <option value="Jayad">Jayad</option>
        </select>

        <p className="text-lg font-semibold mb-2 text-gray-600">Select Crops</p>
        <div className="space-y-2 mb-6">
          {cropsList.map((crop) => (
            <motion.label
              key={crop}
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={crop}
                checked={selectedCrops.includes(crop)}
                onChange={() => handleCheckboxChange(crop)}
                className="accent-green-600"
              />
              <span className="text-gray-700">{crop}</span>
            </motion.label>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-70"
        >
          {loading ? (
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
              role="status"
            />
          ) : (
            "Submit"
          )}
        </button>

        {status && <p className="mt-4 text-sm text-center text-gray-700">{status}</p>}
        {error && <p className="mt-2 text-sm text-center text-red-500">{error}</p>}
      </motion.form>
    </motion.div>
  );
};

export default CropSelector;
