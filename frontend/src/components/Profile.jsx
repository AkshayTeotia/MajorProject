import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
      const res = await axios.post("http://localhost:5000/user/profile", {}, header);
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
      className="mt-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-center text-3xl font-semibold text-green-700 mb-4">
        {loading ? "Loading profile..." : "👤 User Profile"}
      </p>

      {error && <p className="text-red-600 text-center">{error}</p>}
      <Logout/>

      {!loading && data && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-600 mb-2">Name: <span className="text-green-700">{data.fullName}</span></h1>
          <p className="text-lg text-gray-700 mb-1">📧 Email: {data.email}</p>
          <p className="text-lg text-gray-700">📞 Mobile: {data.phoneNumber}</p>
        </motion.div>
      )}

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">📝 Your Activities</h2>

        {activities.length > 0 ? (
          <motion.ul
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
          >
            {activities.map((act) => (
              <motion.li
                key={act._id}
                className="border border-green-200 bg-green-50 p-4 rounded-md shadow-sm"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <p className="text-lg font-semibold text-gray-800">
                  ✅ {act.activityName}
                </p>
                <p className="text-gray-700">🌾 Crop: {act.crop}</p>
                <p className="text-gray-600">
                  🕒 Date: {new Date(act.activityTime).toLocaleString()}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <p className="text-gray-600">No activities found.</p>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
