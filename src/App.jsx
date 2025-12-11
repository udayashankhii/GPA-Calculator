// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Home/Navbar";
import HomePage from "./Home/Home";
import SoftwarePage from "./Software/Software.Page";
import Register from "./Login/Register";
import LoginForm from "./Login/LoginForm";
// import ComputerCgpa from "./components/Computer/Computer.Subjects";
// import CivilCgpa from "./components/Civil/Civil.Subjects";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register/>} />


          <Route path="/software" element={<SoftwarePage />} />

          {/* Add other streams */}
          {/* <Route path="/computer" element={<ComputerCgpa />} /> */}
          {/* <Route path="/civil" element={<CivilCgpa />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
