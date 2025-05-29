import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setStatus('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setStatus('❌ OTP must be 6 digits.');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      const res = await axios.post(`http://localhost:5000/user/forgot-password/verify-otp/${otp}`);
      if (res.data.success) {
        setStatus('✅ OTP verified successfully!');
        setTimeout(() => navigate('/reset-password'), 1200);
      } else {
        setStatus('❌ Invalid OTP. Please try again.');
      }
    } catch (err) {
      setStatus('❌ Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-xl sm:text-2xl font-bold text-center mb-4 text-green-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          OTP Verification
        </motion.h2>

        <motion.label
          className="block text-sm sm:text-base font-medium mb-1 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Enter OTP
        </motion.label>
        <motion.input
          type="text"
          value={otp}
          onChange={handleChange}
          required
          placeholder="6-digit code"
          className="w-full border rounded px-3 py-2 mb-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        />

        <motion.button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 active:scale-95 transition-all duration-300"
          disabled={loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </motion.button>

        {status && (
          <motion.p
            className="text-sm mt-3 text-center text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {status}
          </motion.p>
        )}
      </motion.form>
    </motion.div>
  );
};

export default OTPVerification;
