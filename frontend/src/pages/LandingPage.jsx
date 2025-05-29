import React from 'react'

import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate=useNavigate("")
  return (
    <div className="bg-gradient-to-br from-green-100 via-lime-200 to-yellow-100 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center p-10 bg-[url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')] bg-cover bg-no-repeat bg-center">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg"
        >
          Welcome to KrishiConnect
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl mt-4 text-green-700 max-w-xl"
        >
          Empowering Farmers with Smart Agriculture Tools: Disease Detection, Forecasting, Scheduling & More
        </motion.p>
        <motion.button 
          whileHover={{ scale: 1.1 }} 
       
          className="mt-8 px-6 py-3 bg-green-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-green-700"
        >
       <Link to={"/signup"}>Get Started</Link>
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <motion.h2 
          className="text-4xl font-bold text-center text-green-700 mb-12"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        >
          Features We Offer
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Plant Disease Detection",
              desc: "Upload crop images and detect diseases instantly with AI recommendations."
            },
            {
              title: "Weather Forecasting",
              desc: "Localized weather updates to help you plan your farming schedule."
            },
            {
              title: "Crop Scheduling",
              desc: "Smart irrigation and fertilizer reminders for optimal yield."
            },
            {
              title: "Market Price Updates",
              desc: "Stay informed with real-time crop pricing in your region."
            },
            {
              title: "Farmer Community Forum",
              desc: "Discuss, share and get support from fellow farmers."
            },
            {
              title: "Personalized Dashboard",
              desc: "Track your crops, weather, disease alerts and schedules in one place."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: i * 0.2 }} 
              viewport={{ once: true }}
              className="bg-green-50 p-6 rounded-2xl shadow-md hover:shadow-xl border border-green-200"
            >
              <h3 className="text-xl font-bold text-green-800 mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-200 via-yellow-100 to-green-100 text-center">
        <motion.h2 
          className="text-4xl font-bold text-green-900 mb-6"
          initial={{ scale: 0.8, opacity: 0 }} 
          whileInView={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.6 }}
        >
          Join Thousands of Smart Farmers Today
        </motion.h2>
        <p className="text-gray-700 max-w-xl mx-auto">
          KrishiConnect is more than just an app — it's your farming companion. Make smarter decisions, get AI support, and grow better.
        </p>
        <motion.button 
       
          whileHover={{ scale: 1.05 }} 
          className="mt-8 px-8 py-3 bg-green-700 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-green-800"
        >
          <a href="/weather"> Explore Now</a>
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white p-6 text-center">
        <p className="text-lg font-medium">Contact Us: info@krishiconnect.com | +91-9557792651</p>
        <p className="mt-2">© 2025 KrishiConnect | Built with ❤ for Farmers</p>
      </footer>
    </div>
  );
}
