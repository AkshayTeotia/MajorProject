import React, { useState } from "react";
import Gemini from "../Api/Gemini";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

export default function PlantDiseaseDetector() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [treatmentSuggestions, setTreatmentSuggestions] = useState(null);
  const [treatmentLoading, setTreatmentLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const detectDisease = async () => {
    if (!image) {
      setResult("Please select an image first.");
      return;
    }

    setLoading(true);
    setResult(null);
    setTreatmentSuggestions(null);
    setTreatmentLoading(false);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const payload = {
        images: [base64Image],
        latitude: 28.6139,
        longitude: 77.2090,
        similar_images: true,
      };

      try {
        const response = await fetch("https://crop.kindwise.com/api/v1/identification", {
          method: "POST",
          headers: {
            "Api-Key": import.meta.env.VITE_KEY2,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const diseases = data.result.disease.suggestions;
        const highestProbabilityDisease = diseases.reduce((max, disease) =>
          disease.probability > max.probability ? disease : max
        );

        const resultData = {
          name: highestProbabilityDisease.name,
          probability: highestProbabilityDisease.probability,
          scientificName: highestProbabilityDisease.scientific_name,
        };

        setResult(resultData);
        setTreatmentLoading(true);
        const treatmentResponse = await Gemini(highestProbabilityDisease.name);
        setTreatmentSuggestions(treatmentResponse);
      } catch (error) {
        setResult("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(image);
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <motion.div
        className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-6 md:p-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col gap-6 items-center">
          <motion.h2
            className="text-3xl font-bold text-green-700 text-center"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            🌿 Plant Disease Detector
          </motion.h2>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border-1 border-solid border-green-300 p-3 rounded-xl text-gray-500 bg-green-50 hover:bg-green-100 transition"
          />

          {preview && (
            <motion.img
              src={preview}
              alt="Preview"
              className="w-72 h-72 object-cover rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          <motion.button
            onClick={detectDisease}
            disabled={loading}
            className="w-full bg-green-600 cursor-pointer disabled:opacity-70 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Detecting..." : "Detect Disease"}
          </motion.button>

          <AnimatePresence>
            {result && typeof result === "object" && (
              <motion.div
                key="result"
                className="w-full bg-gray-100 border border-gray-300 rounded-xl p-5 shadow-inner text-center space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <h3 className="text-xl font-semibold text-green-600 font-medium">Detected Disease</h3>
                <p><strong>Name:</strong> {result.name}</p>
                <p><strong>Probability:</strong> {result.probability.toFixed(2)}</p>
                <p><strong>Scientific Name:</strong> {result.scientificName}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {result && !treatmentSuggestions && treatmentLoading && (
            <motion.div
              key="loading-treatment"
              className="w-full text-center text-gray-600 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="italic animate-pulse">Loading Treatment Suggestions...</p>
            </motion.div>
          )}

          <AnimatePresence>
            {treatmentSuggestions && (
              <motion.div
                key="treatment"
                className="w-full bg-white border border-green-300 rounded-xl p-5 shadow-lg text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="text-xl font-semibold text-green-700 mb-2">Treatment and Precautions</h3>
                <ReactMarkdown >
                  {treatmentSuggestions}
                </ReactMarkdown>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
