import React from "react";
import GradeSelect from "../GPA/Grade.Select";

export default function Semester({ sem, semIdx, grades, handleGradeChange, semesterResult }) {
  return (
    <section className="border p-4 rounded-lg bg-white shadow">
      <h2 className="font-semibold text-xl mb-2">{sem.name}</h2>
      <table className="w-full border-collapse text-left mb-2">
        <thead>
          <tr className="border-b">
            <th className="py-1">Code</th>
            <th className="py-1">Course</th>
            <th className="py-1">Credits</th>
            <th className="py-1">Grade</th>
          </tr>
        </thead>
        <tbody>
          {sem.courses.map((course, courseIdx) => {
            const key = `${semIdx}-${courseIdx}`;
            return (
              <tr key={key} className="border-b">
                <td className="py-1">{course.code}</td>
                <td className="py-1">{course.name}</td>
                <td className="py-1">{course.credits}</td>
                <td className="py-1">
                  <GradeSelect
                    value={grades[key]}
                    onChange={(val) => handleGradeChange(semIdx, courseIdx, val)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-2 flex justify-between font-medium">
        <span>Earned Credits: {semesterResult?.credits ?? 0}</span>
        <span>SGPA: {semesterResult?.sgpa ? semesterResult.sgpa.toFixed(2) : "-"}</span>
      </div>
    </section>
  );
}
