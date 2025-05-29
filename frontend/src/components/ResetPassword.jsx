import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const ResetPassword = () => {
  
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp,setOtp]=useState("")
  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const res = await axios.post(`http://localhost:5000/user/reset-password`, {
      
      newPassword: password
      });

      setStatus('✅ Password reset successful!');
      setTimeout(() => navigate('/login'), 2000); // Redirect after success
    } catch (err) {
      console.error(err);
      setStatus('❌ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.form
        onSubmit={handleReset}
        className="bg-white shadow-md p-6 rounded-md w-full max-w-sm"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-xl sm:text-2xl font-bold mb-4 text-center text-green-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          Reset Your Password
        </motion.h2>

        <motion.label
          className="block text-sm sm:text-base font-medium mb-1 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          New Password
        </motion.label>
        <motion.input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4 text-sm sm:text-base"
          placeholder="Enter new password"
          required
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        />

        <motion.button
          type="submit"
          className="w-full cursor-pointer bg-green-600 text-white py-2 rounded hover:bg-green-700 active:scale-95 transition-all duration-300"
          disabled={loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
