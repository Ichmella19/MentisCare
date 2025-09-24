"use client";

import React from "react";
import Image from "next/image";

type DetailSuiviProps = {
  suivi: {
    id: number;
    description: string;
    prescription: string;
    fichier: string;
    createdAt: string;
    updatedAt: string;
    patient: {
      id: number;
      name: string | null;
    };
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  onClose: () => void;
};

export default function DetailSuivi({ suivi, onClose }: DetailSuiviProps) {
  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/40 mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Détails du suivi du patient </h2>
        
        <div className="space-y-2">
          <p><strong>Médecin :</strong> {suivi.user.name} </p>
          <p><strong>Adresse mail du Médecin :</strong> ({suivi.user.email})</p>
            <p><strong>Patient :</strong> {suivi.patient.name ?? "—"}</p>
          <p><strong>Date de création :</strong> {new Date(suivi.createdAt).toLocaleDateString()}</p>
                    <p><strong>Heure de création :</strong> {new Date(suivi.createdAt).toLocaleTimeString()}</p>
          <p><strong>Description :</strong> <br />
          <div dangerouslySetInnerHTML={{ __html: suivi.description }} /></p>
          <p><strong>Prescription :</strong> <br />
          <div dangerouslySetInnerHTML={{ __html: suivi.prescription }} /> </p>
          <p><strong>Fichier :</strong> <br />
           <Image
            src={suivi.fichier}
            className="mt-2 rounded mx-auto"
            alt="Description de mon image"
            width={250}
            height={300}
          />
      </p>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
