import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold">
          PU Grade  <span className="text-indigo-600">GPA</span> Calculator
        </h1>
        <p className="text-xl text-gray-600">
          Calculate your GPA for Software, Computer, or Civil Engineering streams
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
          <button
            onClick={() => navigate("/software")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
          >
            Software Engineering
          </button>

          <button
            onClick={() => navigate("/computer")}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
          >
            Computer Engineering
          </button>

          {/* Add more buttons for other streams if needed */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
