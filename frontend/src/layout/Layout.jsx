import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full h-full flex">
    {/* Sidebar: hidden on small screens */}
    <div className="hidden sm:block fixed h-screen w-[264px]">
      <Sidebar />
    </div>
  
    {/* Main content area */}
    <div className="flex-1 w-full sm:ml-[264px]">
      <Outlet />
    </div>
  </div>
  
  );
};

export default Layout;
