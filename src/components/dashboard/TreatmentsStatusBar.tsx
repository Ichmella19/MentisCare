"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { status: "En traitement", count: 210 },
  { status: "Stabilisés", count: 140 },
  { status: "Abandon", count: 60 },
  { status: "Guéris", count: 72 },
];

export default function TreatmentStatusBar() {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-semibold mb-4">Statut des traitements</h3>

      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#10b981" />
      </BarChart>
    </div>
  );
}
