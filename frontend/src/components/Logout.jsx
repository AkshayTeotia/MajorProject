import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // redirect to home or login
  };

  return (
    <div className="p-1 bg-green-500 w-fit rounded-lg">
      <button
        onClick={handleLogout}
        className="cursor-pointer text-white font-semibold px-2 py-1"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;

