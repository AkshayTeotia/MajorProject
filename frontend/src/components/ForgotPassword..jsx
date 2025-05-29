import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const res = await axios.post('http://localhost:5000/user/forgot-password', { email });
      setStatus(res.data.message || '✅ If this email exists, a reset link has been sent.');
      navigate("/forgot-password/verify-otp")
    } catch (err) {
      console.error(err);
      setStatus('❌ Error sending Otp...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.form
        onSubmit={handleForgot}
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
          Forgot Password
        </motion.h2>

        <motion.label
          className="block text-sm sm:text-base font-medium mb-1 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Email Address
        </motion.label>
        <motion.input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 mb-4 text-sm sm:text-base"
          placeholder="Enter your email"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        />

        <motion.button
          type="submit"
          className="w-full bg-green-600 cursor-pointer text-white py-2 rounded hover:bg-green-700 active:scale-95 transition-all duration-300"
          disabled={loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {loading ? 'Sending...' : 'Send OTP'}
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

export default ForgotPassword;
