// ContactForm.js
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  exit: { opacity: 0, y: 30, transition: { duration: 0.4 } },
};

const childVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const contactItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

const ContactForm = () => {
  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [subject,setSubject]=useState("");
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    // Handle login logic here
    const payload={
       fullName,
        email,
        subject,
        message
    }
    await new Promise(resolve=>setTimeout(resolve,500)) ;
      
axios.post("http://localhost:5000/user/contact",payload)
.then((res)=>{
    setLoading(false);
    toast("Message sent  Successfull")
   console.log("Message sent ",res);
    setStatus("Message sent Successfully")

})
.catch((err)=>{
    toast(" message Failed")
    setStatus("Mesage Failed!")
    console.log("error occured",err);
    setLoading(false);
})
  
  };


  return (
    <AnimatePresence>
      <motion.div
        className="flex-grow bg-gray-50 px-4 sm:px-6 md:px-12 lg:px-24 py-10 max-w-4xl mx-auto rounded-lg shadow-lg"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-4 sm:mb-6 drop-shadow-sm text-center"
          variants={childVariants}
        >
          Get in Touch
        </motion.h2>
        <motion.p
          className="text-lg font-medium py-2 text-gray-600 max-w-xl leading-relaxed mx-auto text-center"
          variants={childVariants}
        >
          Have questions? We're here to help with your farming needs.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="text-lg mt-6"
          variants={childVariants}
        >
          <motion.div className="mb-5" variants={childVariants}>
            <label className="block mb-2 font-medium text-gray-700" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="border border-gray-300 p-3 w-full rounded-xl font-semibold bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-green-300 transition"
              type="text"
              required
              value={fullName}
              name="fullName"
              id="fullName"
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </motion.div>

          <motion.div className="mb-5" variants={childVariants}>
            <label className="block mb-2 font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-300 p-3 w-full rounded-xl font-semibold bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-green-300 transition"
              type="email"
              required
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
            />
          </motion.div>

          <motion.div className="mb-5" variants={childVariants}>
            <label className="block mb-2 font-medium text-gray-700" htmlFor="subject">
              Subject
            </label>
            <input
              className="border border-gray-300 p-3 w-full rounded-xl font-semibold bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-green-300 transition"
              type="text"
              required
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              id="subject"
              placeholder="What is your inquiry about?"
            />
          </motion.div>

          <motion.div className="mb-8" variants={childVariants}>
            <label className="block mb-2 font-medium text-gray-700" htmlFor="message">
              Message
            </label>
            <textarea
              rows={6}
              className="border border-gray-300 p-3 w-full rounded-xl font-semibold bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-green-300 transition resize-none"
              id="message"
              value={message}
              name="message"
              required
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us how we can help you..."
            ></textarea>
          </motion.div>

          <motion.button
            disabled={loading}
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-700 disabled:opacity-70 cursor-pointer hover:from-green-600 hover:to-green-800 text-white p-4 rounded-xl shadow-lg transition duration-300 w-full font-semibold text-lg"
            whileTap={{ scale: 0.97 }}
            variants={childVariants}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
        {<p className="text-center pt-3 text-lg font-medium">{status}</p>}

        {/* Contact Info */}
        <motion.div
          className="mt-10 text-sm max-w-md mx-auto sm:max-w-none space-y-6"
          variants={containerVariants}
        >
          <motion.div className="flex items-center my-3" variants={contactItemVariants}>
            <div className="bg-gray-300 p-4 rounded-lg mr-4 flex-shrink-0 shadow-inner">
              <MdOutlineEmail fontSize={28} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Email Support:</h3>
              <p className="text-gray-600 truncate">support@krishiconnect.com</p>
            </div>
          </motion.div>

          <motion.div className="flex items-center my-3" variants={contactItemVariants}>
            <div className="bg-gray-300 p-4 rounded-lg mr-4 flex-shrink-0 shadow-inner">
              <FaPhoneAlt fontSize={28} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Phone Support</h3>
              <p className="text-gray-600 truncate">+91 (995577)92651 </p>
            </div>
          </motion.div>

          <motion.div className="flex items-center my-3" variants={contactItemVariants}>
            <div className="bg-gray-300 p-4 rounded-lg mr-4 flex-shrink-0 shadow-inner">
              <IoTimeSharp fontSize={28} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Working Hours</h3>
              <p className="text-gray-600">Monday to Friday, 9:00 AM - 6:00 PM</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactForm;
