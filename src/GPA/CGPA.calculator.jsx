import React, { useState, useMemo, useEffect } from "react";
import Semester from "../Semster/Semester";

export default function CgpaCalculator({ streamName, semesters }) {
  const [grades, setGrades] = useState({});
  const token = localStorage.getItem("accessToken");

  // -----------------------------------------
  // LOAD SAVED DATA FROM BACKEND
  // -----------------------------------------
  useEffect(() => {
    if (!token) return;

    const fetchSaved = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/results/get/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          const data = await res.json();
          if (data?.grades) {
            setGrades(data.grades);
          }
        }
      } catch (err) {
        console.log("Failed to load saved results", err);
      }
    };

    fetchSaved();
  }, [token]);

  // Update grade locally
  const handleGradeChange = (semIdx, courseIdx, value) => {
    setGrades((prev) => ({ ...prev, [`${semIdx}-${courseIdx}`]: value }));
  };

  // -----------------------------------------
  // GPA CALCULATIONS
  // -----------------------------------------
  const { semesterResults, overall } = useMemo(() => {
    const semesterResults = [];
    let totalWeightedGpa = 0;
    let totalCreditsAll = 0;

    semesters.forEach((sem, semIdx) => {
      let creditsSum = 0;
      let gradePointSum = 0;

      sem.courses.forEach((course, courseIdx) => {
        const key = `${semIdx}-${courseIdx}`;
        const gp = GradePoints[grades[key]] ?? null;

        if (gp !== null) {
          gradePointSum += gp * course.credits;
          creditsSum += course.credits;
        }
      });

      const sgpa = creditsSum > 0 ? gradePointSum / creditsSum : null;

      if (sgpa) {
        totalWeightedGpa += sgpa * creditsSum;
        totalCreditsAll += creditsSum;
      }

      semesterResults.push({ name: sem.name, credits: creditsSum, sgpa });
    });

    const cgpa = totalCreditsAll > 0 ? totalWeightedGpa / totalCreditsAll : null;

    return { semesterResults, overall: { totalCreditsAll, cgpa } };
  }, [grades, semesters]);

  // -----------------------------------------
  // AUTO-SAVE TO BACKEND WHEN GRADES CHANGE
  // -----------------------------------------
  useEffect(() => {
    if (!token) return;
    if (Object.keys(grades).length === 0) return;

    const saveResults = async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/results/save/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            grades: grades,
            cgpa: overall.cgpa,
            sgpa: semesterResults.reduce((acc, sem) => {
              acc[sem.name] = sem.sgpa;
              return acc;
            }, {}),
          }),
        });
      } catch (err) {
        console.log("Failed to save results", err);
      }
    };

    const timeout = setTimeout(saveResults, 800);
    return () => clearTimeout(timeout);
  }, [grades, overall, semesterResults, token]);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        {streamName} CGPA Calculator
      </h1>

      {semesters.map((sem, semIdx) => (
        <Semester
          key={sem.name}
          sem={sem}
          semIdx={semIdx}
          grades={grades}
          handleGradeChange={handleGradeChange}
          semesterResult={semesterResults[semIdx]}
        />
      ))}

      <div className="border-t pt-4 text-center font-semibold">
        <p>Total Credits: {overall.totalCreditsAll}</p>
        <p>CGPA: {overall.cgpa !== null ? overall.cgpa.toFixed(3) : "-"}</p>
      </div>
    </div>
  );
}

// SHARED GRADE POINTS
export const GradePoints = {
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  F: 0.0,
};
