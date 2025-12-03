"use client";

import { statGraph } from "@/app/admin/dashboard/personal/action";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
  month: string;
  count: number;
  label: string;
}

export default function DoctorPatientsChart() {

  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await statGraph();

        if (result?.success) {
          // Try common shapes: result.data.patients or result.data itself
          if (Array.isArray(result.monthlyData)) {
            setData(result.monthlyData);
          } else {
            setData([]);
          }
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Erreur:", err);
        setData([]);
      }
    }

    loadData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow h-[350px]">
      <h2 className="text-lg font-semibold mb-4">Évolution des consultations</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#08A3DC" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
