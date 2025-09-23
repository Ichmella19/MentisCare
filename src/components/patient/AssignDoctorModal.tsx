"use client";

import React, { useEffect, useState } from "react";
import { listDoctors } from "@/app/admin/(others-pages)/patients/action";

type Doctor = {
  id: string;
  name: string;
  email: string;
};

type AssignDoctorModalProps = {
  patientId: number;
  onClose: () => void;
};

export default function AssignDoctorModal({ patientId, onClose }: AssignDoctorModalProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");

   useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const result = await listDoctors();
        if (result.success && result.data) {
          setDoctors(result.data);
        }
        const res = await fetch("@/app/admin/(others-pages)/patients/action");
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error("Erreur fetch doctors", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleAssign = async () => {
    if (!selectedDoctor) return;

    // TODO : appelle une API pour assigner le médecin
    console.log("Assigner médecin", selectedDoctor, "au patient", patientId);

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Assigner un médecin à ce patient</h2>

        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 dark:bg-gray-800"
        >
          <option value=""> Sélectionner un médecin</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} ({doctor.email})
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded-md">
            Annuler
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedDoctor}
            className="px-4 py-2 bg-[#08A3DC] text-white rounded-md hover:bg-[#0b91c6]"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
