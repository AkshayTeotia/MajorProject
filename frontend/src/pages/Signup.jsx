import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function inputChangeHandler(event) {
    const { name, value } = event.target;
    switch (name) {
      case 'fullName':
        setFullName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      fullName: fullName,
      email: email,
      password: password,
      phoneNumber: phoneNumber
    };

    await new Promise(resolve => setTimeout(resolve, 1500));

    axios.post("http://localhost:5000/user/register", payload)
      .then((res) => {
        setLoading(false);
        toast("Account created successfully");
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        toast("Registration Failed");
        setError("Email Already Exists!");
      });
  };

  return (
    <motion.div
      className="min-h-screen bg-[url(./assets/bgImage.jpg)] bg-cover bg-center flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-white sm:w-full w-[90%] sm:max-w-md p-6 rounded-lg shadow-xl shadow-gray-500/50"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 text-center mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
        >
          Sign Up
        </motion.h1>

        <p className="text-sm sm:text-base text-gray-600 text-center mb-4">
          Please fill in this form to create an account
        </p>

        <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <motion.label
            className="text-green-500 text-lg sm:text-xl mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Full Name
          </motion.label>
          <motion.input
            className="outline-none px-3 py-2 bg-gray-100 rounded-md text-sm sm:text-base mb-3"
            type="text"
            name="fullName"
            value={fullName}
            placeholder="Enter Your Full Name"
            onChange={inputChangeHandler}
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />

          {/* Email Field */}
          <motion.label
            className="text-green-500 text-lg sm:text-xl mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Email
          </motion.label>
          <motion.input
            className="outline-none px-3 py-2 bg-gray-100 rounded-md text-sm sm:text-base mb-3"
            type="email"
            name="email"
            value={email}
            placeholder="Enter Your Email"
            onChange={inputChangeHandler}
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          />

          {/* Error Message */}
          {error && (
            <motion.div
              className="text-red-600 p-2 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          {/* Password Field */}
          <motion.label
            className="text-green-500 text-lg sm:text-xl mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            Password
          </motion.label>
          <motion.input
            className="outline-none px-3 py-2 bg-gray-100 rounded-md text-sm sm:text-base mb-3"
            type="password"
            name="password"
            value={password}
            placeholder="Enter Your Password"
            onChange={inputChangeHandler}
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          />

          {/* Phone Number Field */}
          <motion.label
            className="text-green-500 text-lg sm:text-xl mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            Phone Number
          </motion.label>
          <motion.input
            className="outline-none px-3 py-2 bg-gray-100 rounded-md text-sm sm:text-base mb-3"
            type="tel"
            pattern="[0-9]{10}"
            name="phoneNumber"
            value={phoneNumber}
            placeholder="Enter Your Phone Number"
            onChange={inputChangeHandler}
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          />

          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
          >
            <p className="text-xs sm:text-sm text-gray-600">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-green-600 font-bold">
                Terms & Policies
              </a>
            </p>
          </motion.div>

          {/* Already have an account link */}
          <motion.div
            className="text-center text-sm text-gray-700 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.1 }}
          >
            <p>
              Already have an Account?{' '}
              <Link to={"/login"} className="underline text-green-400">
                Login
              </Link>
            </p>
          </motion.div>

          {/* Signup Button */}
          <motion.button
            disabled={loading}
            type="submit"
            className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-md mt-4 transition-all duration-300 ease-in-out hover:bg-green-700 active:scale-95 disabled:bg-green-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            {loading ? "Submitting..." : "Sign Up"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
