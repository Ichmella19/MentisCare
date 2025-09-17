"use client";
import React, { useState } from "react";
import AddConsultation from "@/components/consultation/AddConsultation";
 import DeleteConsultation from "@/components/consultation/DeleteConsultation";
 
import { deleteConsultation } from "@/app/admin/(others-pages)/consultations/action";

import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { Eye } from "lucide-react";

type Consultation = {
  id: number;
  categorie: string;
  quantite: number;
  createdAt: string;
};

type Props = {
  consultations: Consultation[];
};

export default function TableConsultation({ consultations }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrage par catégorie
  const filteredConsultations = consultations.filter((c) =>
    c.categorie?.toLowerCase().includes(search.toLowerCase())
  );
  const handleDeleteClick = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setIsDeleteModalOpen(true);
  };
  const handleDetailClick = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setIsDeleteModalOpen(true);
  }
  const confirmDelete = async () => {
  if (!selectedConsultation) return;

  try {
    const result = await deleteConsultation(selectedConsultation.id);

    if (result.success) {
      
      toast.success(result.message);
      setIsDeleteModalOpen(false);
      setSelectedConsultation(null);
    } else {
      toast.error(result.message || "Erreur lors de la suppression.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Erreur serveur");
  }
};

  return (
    <div
      className="p-6 bg-white text-black dark:bg-black dark:text-white min-h-screen"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <h1 className="text-2xl font-bold mb-6">Consultations</h1>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
         
        </div>

        {/* Barre de recherche */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="p-3">Catégorie</th>
                <th className="p-3">Quantité</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredConsultations.length > 0 ? (
                filteredConsultations.map((consultation) => {
                  const stock = 5 - consultation.quantite; // calcul du stock
                  return (
                    <tr
                      key={consultation.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="p-3">{consultation.categorie}</td>
                      <td className="p-3">{consultation.quantite}</td>
                      <td className="p-3">{stock}</td>
                      <td className="p-3">
                        {new Date(consultation.createdAt).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="p-3 text-center flex gap-2 justify-center ">
                                        
                                          <button 
                                          onClick={() => handleDetailClick(consultation)}
                                          className="border-[#08A3DC] rounded-[5px]  border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] hover:text-white transition">
                                          <Eye />
                                         </button>
                                         <button
                                           onClick={() => handleDeleteClick(consultation)}
                                           className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                                         >
                                           <FaTrash />
                                         </button>
                                       </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    Aucune consultation trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
             {/* Modal Suppression */}
                  {isDeleteModalOpen && selectedConsultation&& (
                    <DeleteConsultation
                      onClose={() => setIsDeleteModalOpen(false)} 
                      onSucces={confirmDelete} 
                    />
                  )}
      {isModalOpen && <AddConsultation onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
