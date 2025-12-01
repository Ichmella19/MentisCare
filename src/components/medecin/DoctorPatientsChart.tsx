"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", consultations: 12 },
  { month: "Feb", consultations: 19 },
  { month: "Mar", consultations: 15 },
  { month: "Apr", consultations: 25 },
];

export default function DoctorPatientsChart() {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow h-[350px]">
      <h2 className="text-lg font-semibold mb-4">Évolution des consultations</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="consultations" stroke="#08A3DC" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
