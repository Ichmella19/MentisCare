"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Header from "./header/header";
import Footer from "./footer/footer";

export default function SuiviProchePage() {
  const [matricule, setMatricule] = useState("");
  const [showData, setShowData] = useState(false);

  const handleSearch = () => {
    // pour l’instant on ne fait que simuler
    if (matricule.trim() !== "") {
      setShowData(true);
    } else {
      setShowData(false);
    }
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
      {showData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
            <h2 className="font-semibold text-lg mb-2">Nombre de suivis</h2>
            <p className="text-2xl font-bold text-blue-600">12</p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
            <h2 className="font-semibold text-lg mb-2">Dernier rendez-vous</h2>
            <p className="text-md">15 Septembre 2025</p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center">
            <h2 className="font-semibold text-lg mb-2">État actuel</h2>
            <p className="text-green-600 font-bold">Stable</p>
          </div>
        </div>
      )}
    </div>
    <Footer />
     </div>
  );
}
