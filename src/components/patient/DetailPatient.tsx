"use client";

import React from "react";
import { useState } from "react";
import EditPatient from "@/components/patient/EditPatient";
import AssignDoctorModal from "@/components/patient/AssignDoctorModal";

type Patient = {
  id: number;
  name: string;
  email: string;
  phone: string;
  adresse: string;
  pays: string;
  sexe: string;
  dateNaissance: string ;
  user: any;
};

type DetailPatientProps = {
  patient: Patient;
  onClose: () => void;
};
 
export default function DetailPatient({ patient, onClose }: DetailPatientProps) {
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false); 
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
   const handleEditClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center p-2 sm:p-4 z-50">
      {/* Overlay sombre */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Contenu du modal */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl p-4 sm:p-6 relative z-10 md:ml-[20%] overflow-y-auto max-h-[90vh] justify-center items-center">

        {/* En-tête */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Détails du patient</h2>
          <button onClick={onClose}>✖</button>
        </div>

        {/* Corps du modal */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Colonne gauche */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nom complet</h3>
              <p className="text-black dark:text-white">{patient.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="text-black dark:text-white">
                {patient.email || "Non renseigné"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Téléphone</h3>
              <p className="text-black dark:text-white">
                {patient.phone || "Non renseigné"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Date de naissance
              </h3>
              <p className="text-black dark:text-white">
                {patient.dateNaissance || "Non renseignée"}
              </p>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Sexe</h3>
              <p className="text-black dark:text-white">{patient.sexe}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Adresse</h3>
              <p className="text-black dark:text-white">
                {patient.adresse}
              </p>
            </div>
             <div>
              <h3 className="text-sm font-medium text-gray-500">Pays</h3>
              <p className="text-black dark:text-white">
                {patient.pays}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Personnel traitant</h3>
              <p className="text-black dark:text-white">
                {patient.user ? patient.user.name : "Non assigné"}
              </p>
            </div>
          </div>
        </div>

        {/* Boutons */}
        <div className="mt-8 flex justify-between gap-3">
          
          <button
             onClick={() => setIsAssignModalOpen(true)}
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-white transition bg-[#08A3DC]"
          >
           Assigner un médécin traitant
          </button>
          <button
            onClick={() => onClose()}
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-gray-600 transition hover:bg-gray-100"
          >
            Fermer
          </button>
          <button
            onClick={() => handleEditClick(patient)}
            className="cursor-pointer rounded-lg bg-[#08A3DC] px-4 py-2 text-white transition "
          >
            Modifier
          </button>
        </div>
      </div>
       {isEditModalOpen &&  selectedPatient &&(
              <EditPatient 
              patient={selectedPatient}
          onClose={() => setIsEditModalOpen(false)} />
            )}
             {isAssignModalOpen && (
        <AssignDoctorModal
          patientId={patient.id}
          onClose={() => setIsAssignModalOpen(false)}
        />
      )}
    </div>
  );
}
