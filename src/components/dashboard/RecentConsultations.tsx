"use client"
import { getReservLast } from "@/app/admin/dashboard/action";
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
  calendar:any
};

export default function RecentConsultations() {
  const [reservs, setReservs] = useState<Reservation[]>([]);
    
        useEffect(() => {
        async function loadUsers() {
          
          try {
            const result = await getReservLast()
            
            if (result.success) {
              setReservs(result.data);
            } 
          } catch (err) {
            console.error("Erreur:", err);
          } finally {
          }
        }
        
        loadUsers();
      }, []);

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-semibold mb-4 ">Dernières Consultations</h3>

      <ul className="space-y-3">
        {reservs!.map((c:any) => (
          <li key={c.id} className="p-3  border rounded-lg">
            <p className="font-medium">{c.nom}</p>
            <p className="text-sm text-gray-600">
              Par : {c.calendar.user.name}  <br />
              {c.calendar.date.toDateString()}• {c.calendar.heureDebut} - {c.calendar.heureFin}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
