"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
// import { listConsultations } from "@/app/admin/(others-pages)/consultations/action";


import { Eye } from "lucide-react";




type Consultation = {
  id: number;
  categorie: string;                 
  createdAt: string;                 
  quantite: number;                 
  stock: number;                    
  // status: "Vide" | "Reste" | "Plein";
};

export default function TableConsultations() {
 
  const [search, setSearch] = useState("");
  // const [consultations, setConsultations] = useState<Consultation[]>([
    
    
  // ]);
  
  // const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
 


  const filteredConsultations = consultations.filter(
    (c) =>
      // c.categorie.toLowerCase().includes(search.toLowerCase()) ||
      c.categorie.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="p-4 md:p-6 bg-white text-black dark:bg-black dark:text-white min-h-screen"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        Consultations
      </h1>

      {/* Card */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold">Historiques des Consultations</h2>
         
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
         
        </div>

        {/* Table for desktop/tablet */}
        <div className=" overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="p-3">Categorie</th>
                <th className="p-3">Date</th>
                <th className="p-3">Quantité</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Actions</th>
             
              </tr>
            </thead>
            <tbody>
              {filteredConsultations.length > 0 ? (
                filteredConsultations.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 w-full"
                  >
                    <td className="p-3">{c.categorie}</td>
                    <td className="p-3">{c.createdAt}</td>
                    <td className="p-3">{c.quantite}</td>
                    <td className="p-3">{c.stock}</td>
                  

                    <td className="p-3 text-center flex gap-2 justify-center flex-wrap">
                      <button
                      
                    className="border-[#08A3DC] rounded-[5px]  border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] hover:text-white transition">
                      <Eye />
                    </button>
                    </td>
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-3 text-center text-gray-500"
                  >
                    Aucune consultation trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL AJOUT */}
     
     
      {/* MODAL DETAILS */}
      {/* {isEditModalOpen && (
        <EditConsultation onClose={() => setIsEditModalOpen(false)} />
      )} */}
    
    </div>
  );
}
