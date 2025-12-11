// src/components/GradingSystem.jsx
export default function GradingSystem() {
  const grades = [
    { grade: "A",  point: 4.0, desc: "Excellent" },
    { grade: "A-", point: 3.7, desc: "" },
    { grade: "B+", point: 3.3, desc: "" },
    { grade: "B",  point: 3.0, desc: "Good" },
    { grade: "B-", point: 2.7, desc: "" },
    { grade: "C+", point: 2.3, desc: "" },
    { grade: "C",  point: 2.0, desc: "Fair" },
    { grade: "C-", point: 1.7, desc: "" },
    { grade: "D+", point: 1.3, desc: "" },
    { grade: "D",  point: 1.0, desc: "Work satisfying minimum requirement for credit" },
    { grade: "F",  point: 0.0, desc: "Fail" },
  ];

  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Undergraduate Grading System in PU
        </h2>

        <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-blue-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-white">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-white">
                  Honor Point
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-white">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {grades.map((g) => (
                <tr key={g.grade} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-3 text-sm font-semibold text-slate-900">
                    {g.grade}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 text-sm text-slate-700">
                    {g.point.toFixed(1)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 text-sm text-slate-700">
                    {g.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
