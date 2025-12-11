// src/pages/SoftwarePage.jsx
import React from "react";
import { softwareSEMESTERS } from "./Software.Subjects";
import CgpaCalculator from "../GPA/CGPA.calculator";

export default function SoftwarePage() {
  return <CgpaCalculator streamName="Software Engineering" semesters={softwareSEMESTERS} />;
}
