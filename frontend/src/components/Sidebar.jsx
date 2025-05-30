import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { IoHome } from 'react-icons/io5';
import { FaRegStar, FaRegCalendarAlt } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import { TiWeatherSunny } from 'react-icons/ti';
import { RiContactsFill, RiCommunityLine, RiPriceTagLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

const sidebarVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const menuItems = [
  { icon: <IoHome />, label: 'Home', to: '/' },
  { icon: <FaRegStar />, label: 'Disease Detection', to: '/disease-detection' },
  { icon: <FaRegCalendarAlt />, label: 'Crop Calendar', to: '/crop-calendar' },
  { icon: <FiTrendingUp />, label: 'Timeline', to: '/timeline' },
  { icon: <TiWeatherSunny />, label: 'Weather', to: '/weather' },
  { icon: <RiContactsFill />, label: 'Contact', to: '/contact' },
  { icon: <RiCommunityLine />, label: 'Community', to: '/community' },
  { icon: <RiPriceTagLine />, label: 'Market Price', to: '/croprate' },
];

const Sidebar = ({ onLinkClick }) => {
  return (
    <motion.div
      className="bg-green-300 w-67 min-h-screen p-6"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      {/* Logo + Title */}
      <motion.div
        className="flex items-center gap-4 mb-6 overflow-hidden"
        whileHover="hover"
        variants={{
          hover: {},
        }}
      >
        <motion.img
          src="https://tse4.mm.bing.net/th?id=OIP.7wG_AN_6iPQdL4iDwW1p2AAAAA&pid=Api&P=0&h=180"
          alt="KrishiConnect Logo"
          className="h-10 w-[40px] max-w-[40px] object-contain rounded-full flex-shrink-0 shadow-md"
          whileHover={{
            rotate: [0, 10, -10, 5, -5, 0],
            scale: 1.2,
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
        <motion.h1
          className="text-2xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-gray-600 text-transparent bg-clip-text"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          KrishiConnect
        </motion.h1>
      </motion.div>

      {/* Menu Items */}
      <ul className="space-y-4">
        {menuItems.map((item, idx) => (
          <motion.li
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2"
          >
            <div className="bg-amber-100 p-1 rounded">
              {item.icon}
            </div>
            <Link
              to={item.to}
              className="text-lg font-medium text-gray-800"
              onClick={() => onLinkClick && onLinkClick()}
            >
              {item.label}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Profile button at bottom */}
      <motion.div
        className="fixed bottom-6 left-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/profile"
          onClick={() => onLinkClick && onLinkClick()}
        >
          <div className="bg-green-300 p-2 rounded-full shadow hover:scale-105 transition-transform duration-200">
            <CgProfile fontSize={25} />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
