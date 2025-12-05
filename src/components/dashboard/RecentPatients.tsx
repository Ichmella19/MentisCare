"use client"
import { getPatientLast } from "@/app/admin/dashboard/action";
import { useEffect, useState } from "react";

interface Patient{ name: string | null; id: number; adresse: string; sexe: string; pays: string; dateNaissance: string; userId: string | null; email: string | null; phone: string | null; matricule: string; createdAt: Date; updatedAt: Date; }

export default function RecentPatients() {

  const [patients, SetPatients] = useState<Patient[]>([]);
      
          useEffect(() => {
          async function loadUsers() {
            
            try {
              const result = await getPatientLast()
              
              if (result.success) {
                SetPatients(result.data);
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
      <h3 className="text-lg font-semibold mb-4">Derniers Patients</h3>

      <ul className="space-y-3">
        {patients.map((p, i) => (
          <li key={i} className="p-3 border rounded-lg">
            <p className="font-medium">{p.name} • {p.matricule}</p>
            <p className="text-sm text-gray-600">{p.createdAt.toDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
