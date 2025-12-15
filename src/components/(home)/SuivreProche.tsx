"use client";
import { toast } from "react-toastify";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import { suivi } from "@/app/(home)/suivreproche/action";
import DetailProcheModal from "@/components/(home)/DetailProche";

type Suivi = {
  id: number;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  description: string;
  prescription: string;
  fichier: string;
  createdAt: string;
  updatedAt: string;   
  patientId: number;
}

type Patient = {
  id: number;
  name: string;
  matricule: string;
  dateNaissance: string;
  sexe: string;
  email: string;
  phone: string;
  adresse: string;
  pays: string;
  suivis: Suivi[]; // Liste des suivis associés
  createdAt: string;
  updatedAt: string;
};

export default function SuiviProchePage() {
  const [matricule, setMatricule] = useState("");
  const [showData, setShowData] = useState(false);
  const [patientData, setPatientData] = useState<Patient>();; // Pour stocker les données du patient
  const [lastSuivi, setlastSuivi] = useState<Suivi>(); // Pour stocker le dernier suivi
   const [selectedSuivi, setSelectedSuivi] = useState<Suivi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const openModal = (suivi: Suivi) => {
    setSelectedSuivi(suivi);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSuivi(null);
    setIsModalOpen(false);
  };

 const handleSearch = async () => {
  setError(""); // reset erreur

  if (matricule.trim() === "") {
    toast.error("Veuillez entrer un matricule.");
    setShowData(false);
    return;
  }

  setShowData(true);

  const result = await suivi(matricule);

  // Vérification si aucun patient n’est trouvé
  const apiPatient = result.data?.patient;

  if (!apiPatient) {
    setShowData(false);
    setPatientData(undefined);
    setlastSuivi(undefined);

    setError("Aucun patient trouvé avec ce matricule.");
    toast.error("Aucun patient trouvé avec ce matricule.");
    return;
  }

  // Si patient trouvé : remplir les données
  setPatientData({
    id: apiPatient.id,
    name: apiPatient.name ?? "",
    matricule: apiPatient.matricule,
    dateNaissance: apiPatient.dateNaissance,
    sexe: apiPatient.sexe,
    email: apiPatient.email ?? "",
    phone: apiPatient.phone ?? "",
    adresse: apiPatient.adresse,
    pays: apiPatient.pays,
    suivis: apiPatient.Suivi
     
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? apiPatient.Suivi.map((suivi: any) => ({
          id: suivi.id,
          user: suivi.user,
          description: suivi.description,
          prescription: suivi.prescription,
          fichier: suivi.fichier,
          createdAt:
            suivi.createdAt instanceof Date
              ? suivi.createdAt.toISOString()
              : suivi.createdAt,
          updatedAt:
            suivi.updatedAt instanceof Date
              ? suivi.updatedAt.toISOString()
              : suivi.updatedAt,
          patientId: suivi.patientId,
        }))
      : [],
    createdAt:
      apiPatient.createdAt instanceof Date
        ? apiPatient.createdAt.toISOString()
        : apiPatient.createdAt,
    updatedAt:
      apiPatient.updatedAt instanceof Date
        ? apiPatient.updatedAt.toISOString()
        : apiPatient.updatedAt,
  });

  setlastSuivi(
    result.data?.lastSuivi
      ? {
          ...result.data.lastSuivi,
          createdAt:
            result.data.lastSuivi.createdAt instanceof Date
              ? result.data.lastSuivi.createdAt.toISOString()
              : result.data.lastSuivi.createdAt,
          updatedAt:
            result.data.lastSuivi.updatedAt instanceof Date
              ? result.data.lastSuivi.updatedAt.toISOString()
              : result.data.lastSuivi.updatedAt,
        }
      : undefined
  );
};

  return (
   <div className= "bg-white text-black dark:bg-black dark:text-white"style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Header />
      {/* Hero */}
      <div className="bg-[#2E86AB] text-white py-[120px] px-6 md:px-24 text-center">
        <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl font-extrabold mb-6">MentisCare</motion.h1>
        <p className="text-xl max-w-3xl mx-auto">Accédez aux informations essentielles concernant l’évolution du dossier médical 
        de vos proches, en toute sécurité et simplicité, grâce à MentisCare.</p>
      </div>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Suivez le parcours de soin de votre proche
      </h1>

      {/* Barre de recherche */}
      <div className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Entrez le matricule du patient"
          value={matricule}
          onChange={(e) => setMatricule(e.target.value)}
          className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
        />
        <button
          onClick={handleSearch}
          className="bg-[#2E86AB] text-white px-4 py-2 rounded-md  transition"
        >
          Rechercher
        </button>
      </div>

      {/* Résultats fictifs */}
      {(showData && patientData) && (
        <>          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-600 shadow-md rounded-lg p-6 text-center">
              <h2 className="font-semibold text-lg mb-2">Nombre de Rapport</h2>
              <p className="text-2xl font-bold text-blue-600">{patientData?.suivis?.length}</p>
            </div>

            <div className="bg-white dark:bg-gray-600 shadow-md rounded-lg p-6 text-center">
              <h2 className="font-semibold text-lg mb-2">Patient</h2>
              <p className="text-green-600 font-bold">{patientData?.name}</p>
            </div>

            <div className="bg-white dark:bg-gray-600 shadow-md rounded-lg p-6 text-center">
              <h2 className="font-semibold text-lg mb-2">Dernier rendez-vous</h2>
              <p className="text-md">{lastSuivi?.updatedAt}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 m-auto">
            {patientData?.suivis.map((suivi) => (
              <div key={suivi.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-2 ">Rapporteur</h3>
                <p className="text-sm mb-1"><strong>Date de création:</strong> {new Date(suivi.createdAt).toLocaleDateString()}</p>
                <div className="mt-4">
                  <button
                    onClick={() => openModal(suivi)}
                    className="bg-[#08A3DC] text-white px-3 py-1 rounded-md hover:bg-[#067aa7] transition"
                  >
                    Voir Détails
                  </button>
              </div>
              </div>
            ))}
          </div>

        </>
        
      )}
    </div>
          <DetailProcheModal isOpen={isModalOpen} onClose={closeModal} suivi={selectedSuivi} />

    <Footer />
     </div>
  );
}
