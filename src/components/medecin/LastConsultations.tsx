"use client";

import { getLastReservationsByUser } from "@/app/admin/dashboard/personal/action";
import { useEffect, useState } from "react";

interface Reservation {
  id:number,
  calendarId:number,
  nom:string,
  email:string,
  phone:string,
  description:string,
  adresse:string,
  status:boolean,
  createdAt:Date,
};

export default function LastConsultations() {

    const [reservs, setReserv] = useState<Reservation[]>([]);
  
      useEffect(() => {
      async function loadUsers() {
        
        try {
          const result = await getLastReservationsByUser()
          
          if (result.success) {
            setReserv(result.data);
          } else {
            setReserv([]);
          }
        } catch (err) {
          console.error("Erreur:", err);
        } finally {
        }
      }
    loadUsers();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Dernières Réservation</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Patient</th>
            <th className="py-2">Coordonnée</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {reservs.map((c, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="py-2">{c.nom}</td>
              <td className="py-2">{c.email} <br /> {c.phone} <br /> {c.adresse}</td>
              <td className="py-2">{c.createdAt.toISOString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
