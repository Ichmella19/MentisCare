"use client"
import { statsInfoAdmin } from "@/app/admin/dashboard/action";
import { useEffect, useState } from "react";

export default function StatsCards() {

  const [patient, setPatient] = useState(0);
    const [reserv, setReserv] = useState(0);
    const [users, setUsers] = useState(0);
    const [admins, setAdmins] = useState(0);
  
      useEffect(() => {
      async function loadUsers() {
        
        try {
          const result = await statsInfoAdmin()
          
          if (result.success) {
            setPatient(result.data.patients);
            setReserv(result.data.reservation);
            setUsers(result.data.users);
            setAdmins(result.data.admins);
          } else {
            setPatient(0);
            setReserv(0);
            setUsers(0);
            setAdmins(0);
          }
        } catch (err) {
          console.error("Erreur:", err);
        } finally {
        }
      }
      
      loadUsers();
    }, []);
  
  const stats = [
    { label: "Administrateur", value: admins },
    { label: "Personnel actifs", value: users },
    { label: "Total Patients", value: patient },
    { label: "Consultations réalisées", value: reserv },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className="p-5 bg-white text-black dark:bg-black dark:text-white shadow rounded-xl border text-center"
        >
          <p className=" text-sm">{s.label}</p>
          <p className="text-2xl font-bold mt-1">{s.value == 0 ? "---" : s.value}</p>
        </div>
      ))}
    </div>
  );
}
