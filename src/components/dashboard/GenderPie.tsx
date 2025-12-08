"use client";

import { getSexPatient } from "@/app/admin/dashboard/action";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";


const COLORS = ["#ec4899", "#3b82f6"];

export default function GenderPie() {
  
    const [women, setWomen] = useState(0);
    const [men, setMen] = useState(0);
  
      useEffect(() => {
      async function loadUsers() {
        
        try {
          const result = await getSexPatient()
          
          if (result.success) {
            setWomen(result.data.women);
            setMen(result.data.men);
          } else {
            setWomen(0);
            setMen(0);
          }
        } catch (err) {
          console.error("Erreur:", err);
        } finally {
        }
      }
      
      loadUsers();
    }, []);

const data = [
  { name: "Femmes", value: women },
  { name: "Hommes", value: men },
];
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-semibold mb-4">
        Répartition par sexe
      </h3>

      <PieChart width={300} height={300}>
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
