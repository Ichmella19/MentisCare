"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", consultations: 80 },
  { month: "Feb", consultations: 65 },
  { month: "Mar", consultations: 120 },
  { month: "Apr", consultations: 150 },
  { month: "May", consultations: 170 },
  { month: "Jun", consultations: 140 },
];

export default function ConsultationsChart() {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-whitep-6 rounded-xl shadow border">
      <h3 className="text-lg font-semibold mb-4">
        Consultations par mois
      </h3>

      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="consultations" stroke="#2563eb" />
      </LineChart>
    </div>
  );
}
