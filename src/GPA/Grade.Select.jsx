import React from "react";

const GRADE_OPTIONS = [
  "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"
];

export default function GradeSelect({ value, onChange }) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="border px-2 py-1 rounded w-20 text-center uppercase"
    >
      <option value="">--</option>
      {GRADE_OPTIONS.map((g) => (
        <option key={g} value={g}>{g}</option>
      ))}
    </select>
  );
}
