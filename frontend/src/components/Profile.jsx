import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Logout from "./Logout";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");

  const token = JSON.parse(localStorage.getItem("token"));

  const fetchUserData = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post("https://major-project-omega-ochre.vercel.app/user/profile", {}, header);
      setData(res.data.data);
      setActivities(res.data.data.activities || []);
    } catch (err) {
      console.error("Error while fetching user data", err);
      setError("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <motion.div
      className="mt-10 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-green-300 backdrop-filter backdrop-blur-lg bg-white/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-400 p-8 text-white text-center relative">
        <div className="absolute top-4 right-4">
          <Logout />
        </div>
        <motion.div
          className="w-28 h-28 mx-auto bg-white rounded-full flex items-center justify-center text-green-600 text-5xl shadow-lg border-4 border-white hover:scale-105 transition duration-300"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 160 }}
        >
          {data?.fullName?.charAt(0).toUpperCase() || <FaUserCircle />}
        </motion.div>
        <h1 className="text-5xl font-bold mt-4">{loading ? "Loading..." : data?.fullName}</h1>
        <p className="text-xl mt-1">🌱 Welcome to your KrishiConnect Dashboard!</p>
      </div>

      {/* Details */}
      <div className="bg-white px-8 py-6">
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {!loading && data ? (
          <motion.div
            className="text-center md:text-left grid md:grid-cols-2 gap-6 text-gray-700 text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="flex text-2xl items-center justify-center md:justify-start gap-2 hover:text-green-600 transition">
              <FaEnvelope className="text-green-500" /> {data.email}
            </p>
            <p className="flex text-2xl items-center justify-center md:justify-start gap-2 hover:text-green-600 transition">
              <FaPhoneAlt className="text-green-500" /> {data.phoneNumber}
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="text-center text-gray-500 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Fetching your profile...
          </motion.div>
        )}

        {/* Activities */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎖️ Your Activities</h2>

          {activities.length > 0 ? (
            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.15 } },
                hidden: {},
              }}
            >
              {activities.map((act) => (
                <motion.li
                  key={act._id}
                  className="border border-green-100 bg-green-50 p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <p className="text-green-800 font-bold text-xl">✅ {act.activityName}</p>
                  <p className="text-gray-700 text-xl">🌾 Crop: {act.crop}</p>
                  <p className="text-gray-600 text-lg">🕒 {new Date(act.activityTime).toLocaleString()}</p>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <p className="text-gray-500 text-center">No activities found.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;