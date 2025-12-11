// src/pages/SoftwarePage.jsx
import React from "react";
import {computerSEMESTERS } from "./Computer.Syallbus";
import CgpaCalculator from "../GPA/CGPA.calculator";

export default function ComputerPage() {
  return <CgpaCalculator streamName="Computer Engineering Engineering" semesters={computerSEMESTERS} />;
}
