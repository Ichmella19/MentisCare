"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Femmes", value: 280 },
  { name: "Hommes", value: 202 },
];

const COLORS = ["#ec4899", "#3b82f6"];

export default function GenderPie() {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-semibold mb-4">
        Répartition par sexe
      </h3>

      <PieChart width={300} height={220}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
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
