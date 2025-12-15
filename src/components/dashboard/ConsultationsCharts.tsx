"use client";

import { statGraphAdmin } from "@/app/admin/dashboard/action";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

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
    <div className="bg-white text-black dark:bg-black dark:text-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-semibold mb-4">Consultations par mois</h3>

      {/* Conteneur responsive */}
      <div className="w-full h-[260px] sm:h-[300px] md:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
