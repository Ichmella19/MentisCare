"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Dépression", value: 40 },
  { name: "Anxiété", value: 25 },
  { name: "Addiction", value: 15 },
  { name: "Schizophrénie", value: 10 },
  { name: "PTSD", value: 10 },
];

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function DiagnosticPie() {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-semibold mb-4">Types de diagnostics</h3>

      <PieChart width={300} height={240}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
