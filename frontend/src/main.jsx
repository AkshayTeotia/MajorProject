import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import Layout from "./layout/Layout.jsx";

import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

import  Weather from "./pages/Weather.jsx"
import GetInTouch from "./pages/GetInTouch.jsx";
import Community from "./pages/Community.jsx";
import GrowingSeason from "./pages/GrowingSeason.jsx";
import Timeline from "./pages/Timeline.jsx";

import CropRateComponent from "./pages/Croprate.jsx";
import PlantDiseaseDetector from "./pages/DiseaseDetection2.jsx";
import Profile from "./components/Profile.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import ForgotPassword from "./components/ForgotPassword..jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import Logout from "./components/Logout.jsx";
import ProtectedRoute from './components/ProtectedRoute'; // adjust path
import OTPVerification from "./components/OtpVerification..jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/verify-otp" element={<OTPVerification/>} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ✅ Protected Routes */}
     
      <Route
        path="/disease-detection"
        element={
          <ProtectedRoute>
            <PlantDiseaseDetector />
          </ProtectedRoute>
        }
      />
   
      <Route
        path="/crop-calendar"
        element={
          <ProtectedRoute>
            <GrowingSeason />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timeline"
        element={
          <ProtectedRoute>
            <Timeline />
          </ProtectedRoute>
        }
      />
     
     
      <Route
        path="/weather"
        element={
          <ProtectedRoute>
            <Weather />
          </ProtectedRoute>
        }
      />
      <Route
        path="/croprate"
        element={
          <ProtectedRoute>
            <CropRateComponent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <GetInTouch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/community"
        element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);


createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>
 
);
