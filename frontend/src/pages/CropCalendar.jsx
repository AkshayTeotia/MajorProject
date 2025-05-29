// src/components/CropCalendar.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import { FiPlusCircle } from "react-icons/fi";
const crops = [
  { name: "Wheat", season: "Oct - Apr", notes: "High yield potential", recommendation: "Recommended" },
  { name: "Corn", season: "Mar - Aug", notes: "Optimal conditions", recommendation: "Recommended" },
  { name: "Soybeans", season: "May - Oct", notes: "Good market value", recommendation: "Optional" },
];

const CropCalendar = () => {
  return (
    <div className="flex flex-col md:flex-row">
    <Sidebar />
    <div className="flex-1 p-4 px-[200px]">
      <h1 className="text-4xl font-bold mb-4">Crop Calendar</h1>
      <div className='flex gap-5.5  p-1.5 rounded-md my-5 text-lg font-medium  text-gray-500  bg-amber-100'>
        <a className='hover:text-gray-950 active:underline' href="/active-seasons">Active Seasons</a>
        <a  className='hover:text-gray-950 active:underline' href="/active-seasons">Planning</a>
        <a className='hover:text-gray-950 active:underline' href="/active-seasons">History</a>
      </div>
      <div className="mb-4 bg-green-100 p-5 rounded ">
        <div className='bg-white w-12 h-12 p-3.5 rounded-[50%]'><FiPlusCircle fontSize={20}/></div>
        <h2 className="bg-green-100 text-green-850 pt-3  text-2xl font-medium">
          Add New Growing Season
        </h2>
        <p className='text-gray-700 font-medium text-lg'>Define your crop timeline and key activities</p>
        <button className='my-5 bg-green-500 px-3 py-2 rounded tracking-wide font-medium text-white hover:bg-green-800 '>Start Planning</button>
      </div>
      <h2 className="text-xl font-semibold my-5 text-gray-800">Suggested Crops</h2>
      <table className="min-w-full border-collapse border text-lg  font-medium text-gray-600">
        <thead>
          <tr>
            <th className="border p-2">Crop</th>
            <th className="border p-2">Season</th>
            <th className="border p-2">Notes</th>
            <th className="border p-2">Recommendation</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop) => (
            <tr key={crop.name}>
              <td className="border p-2">{crop.name}</td>
              <td className="border p-2">{crop.season}</td>
              <td className="border p-2">{crop.notes}</td>
              <td className="border p-2">{crop.recommendation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

   
  );
};

export default CropCalendar;