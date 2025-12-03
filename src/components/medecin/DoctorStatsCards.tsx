"use client";

import { statsInfo } from "@/app/admin/dashboard/personal/action";
import { useEffect, useState } from "react";

export default function DoctorStatsCards() {
  const [patient, setPatient] = useState(0);
  const [reserv, setReserv] = useState(0);

    useEffect(() => {
    async function loadUsers() {
      
      try {
        const result = await statsInfo()
        
        if (result.success) {
          setPatient(result.data.patients);
          setReserv(result.data.reservation);
        } else {
          setPatient(0);
          setReserv(0);
        }
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
      }
    }
    
    loadUsers();
  }, []);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
        <p className="text-gray-500 text-sm">Mes Patients</p>
        <h2 className="text-3xl font-semibold">{patient}</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
        <p className="text-gray-500 text-sm">Consultations ce mois</p>
        <h2 className="text-3xl font-semibold">{reserv}</h2>
      </div>

    </div>
  );
}
