"use client";

import { statGraphAdmin } from "@/app/admin/dashboard/action";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface ChartData {
  month: string;
  count: number;
  label: string;
}

export default function ConsultationsChart() {

  const [data, setData] = useState<ChartData[]>([]);
  
    useEffect(() => {
      async function loadData() {
        try {
          const result = await statGraphAdmin();
  
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
    <div className="bg-white text-black dark:bg-black dark:text-whitep-6 rounded-xl shadow border">
      <h3 className="text-lg font-semibold mb-4">
        Consultations par mois
      </h3>

      <LineChart width={750} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#2563eb" />
      </LineChart>
    </div>
  );
}
