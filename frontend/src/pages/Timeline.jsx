import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Timeline = () => {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [activityName, setActivityName] = useState('');
  const [activityTime, setActivityTime] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const token = JSON.parse(localStorage.getItem('token'));

  const fetchData = async () => {
    setLoading(true);
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post("http://localhost:5000/user/profile", {}, header);
      setData(res.data.data);
    } catch (err) {
      console.error("Error while fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!data || !data.id) return;

    const fetchCrops = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/seasons/${data.id}`);
        const allCrops = [...new Set(res.data.flatMap(season => season.crops))];
        setCrops(allCrops);
      } catch (error) {
        console.error('Error fetching crops:', error);
        setStatus('❌ Could not load crops.');
      }
    };

    fetchCrops();
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCrop || !activityName || !activityTime) {
      setStatus('⚠️ Please fill all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/activities', {
        user: data.id,
        crop: selectedCrop,
        activityName,
        activityTime
      });

      setStatus('✅ Activity added successfully!');
      setActivityName('');
      setActivityTime('');
      setSelectedCrop('');
    } catch (error) {
      console.error('Error submitting activity:', error);
      setStatus('❌ Failed to add activity.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-center text-green-700">🌱 Add Crop Activity</h2>

        <div>
          <label className="block text-lg font-medium text-gray-700">Select Crop</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full border border-gray-300 rounded-lg text-gray-400 px-4 py-3 mt-1 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <option value="">-- Choose a crop --</option>
            {crops.map((crop) => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Activity Name</label>
          <input
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="e.g., Irrigation, Fertilizer"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Activity Date & Time</label>
          <input
            type="datetime-local"
            value={activityTime}
            onChange={(e) => setActivityTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 bg-white shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        <motion.button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-3 cursor-pointer rounded-lg hover:bg-green-700 shadow-md transition"
          whileTap={{ scale: 0.97 }}
        >
          Add Activity
        </motion.button>

        {status && (
          <motion.p
            className="text-center text-sm mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {status}
          </motion.p>
        )}
      </motion.form>
    </div>
  );
};

export default Timeline;
