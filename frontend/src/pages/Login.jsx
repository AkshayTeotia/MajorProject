import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import {motion} from "framer-motion"
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false)
  const [error, setError] = useState("");
  const navigate=useNavigate("")

  function inputChangeHandler(event) {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    // Handle login logic here
    const payload={
       
        email:email,
        password:password,
    }
    await new Promise(resolve=>setTimeout(resolve,1500)) ; 
      
axios.post("http://localhost:5000/user/login",payload)
.then((res)=>{
    setLoading(false);
    toast("Login Successfull")
   console.log("Login succeed ",res);
   localStorage.setItem("token",JSON.stringify(res.data.token))
   navigate("/profile")
})
.catch((err)=>{
    toast("Login Failed")
    setError(err.response.data.message)
    console.log("Error while login",err);
    setLoading(false);
})
  
  };


  return (
    <motion.div
    className="min-h-screen bg-[url(./assets/bgImage.jpg)] bg-contain flex flex-col items-center px-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }} // Exit animation
    transition={{ duration: 0.5 }}
  >
    <center>
      <motion.h1
        className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mx-3 mt-20 font-bold break-words mb-10 ${
          email ? "visible" : "invisible"
        }`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }} // Exit animation for the header
        transition={{ duration: 0.5 }}
      >
        Welcome Back! Your Email is{" "}
        <span className="text-base sm:text-lg md:text-xl text-green-600">{email}</span>
      </motion.h1>
    </center>

    <motion.div
      className="bg-white w-full sm:max-w-md p-6 rounded-lg shadow-lg shadow-gray-500/50 mt-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }} // Exit animation for the form
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-xl sm:text-2xl font-bold text-green-700 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} // Exit animation for the title
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Login
      </motion.h1>
      <p className="text-sm sm:text-base text-gray-600 mt-2 text-center">
        Please enter your email and password to log in
      </p>

      <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
        {/* Email Field */}
        <motion.label
          className="text-green-500 text-base sm:text-lg mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Exit animation for the email label
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          Email
        </motion.label>
        <motion.input
          className="outline-none px-3 py-2 bg-gray-100 rounded-md text-sm mb-3"
          type="email"
          name="email"
          value={email}
          placeholder="Enter Your Email"
          onChange={inputChangeHandler}
          required
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Exit animation for the email input
          transition={{ duration: 0.4, delay: 0.4 }}
        />

        {/* Password Field */}
        <motion.label
          className="text-green-500 text-base sm:text-lg mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Exit animation for the password label
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          Password
        </motion.label>
        <motion.input
          className="outline-none px-3 py-2 bg-gray-100 rounded-md text-sm mb-3"
          type="password"
          name="password"
          value={password}
          placeholder="Enter Your Password"
          onChange={inputChangeHandler}
          required
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Exit animation for the password input
          transition={{ duration: 0.4, delay: 0.6 }}
        />

        {/* Links */}
        <div className="flex items-center justify-between text-xs sm:text-sm mt-2 text-gray-600 font-medium">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Exit animation for the "new user" text
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            New User?
            <a href="/signup" className="text-green-600 font-semibold pl-1">
              Register
            </a>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Exit animation for the "forgot password" link
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <a href="/forgot-password" className="text-green-600 font-semibold">
              Forgot Password?
            </a>
          </motion.p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="text-red-600 p-2 text-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Exit animation for the error message
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        {/* Login Button */}
        <motion.button
          disabled={loading}
          type="submit"
          className="bg-green-500 cursor-pointer disabled:opacity-70 text-white px-4 py-2 rounded-md mt-4 transition-all duration-300 ease-in-out hover:bg-green-700 active:scale-95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Exit animation for the button
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          {loading ? "Submitting..." : "Login"}
        </motion.button>
      </form>
    </motion.div>
  </motion.div>
  );
}