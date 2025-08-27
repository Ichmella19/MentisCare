"use client";
/* eslint-disable react/no-unescaped-entities */
import {  FaEdit,FaTrash } from "react-icons/fa";
import { useState } from "react";
import AddConsultation from "@/components/consultation/AddConsultation";
import EditConsultation from "@/components/consultation/EditConsultation";
import DeleteConsultation from "@/components/consultation/DeleteConsultation";



type Consultation = {
  id: number;
  categorie: string;                 
  createdAt: string;                 
  quantite: number;                 
  stock: number;                    
  status: "Vide" | "Reste" | "Plein";
};

export default function TableConsultations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [consultations, setConsultations] = useState<Consultation[]>([
    {
      id: 1,
      categorie: "dépression",
      createdAt: "2025-08-17",
      quantite: 20,
      stock: 15,
      status: "Vide",
      
      
    },
    {
      id: 2,
      categorie: "dépression",
      createdAt: "2025-08-17",
      quantite: 20,
      stock: 15,
      status: "Reste" ,
      
      
    },
     {
      id: 3,
      categorie: "dépression",
      createdAt: "2025-08-17",
      quantite: 20,
      stock: 15,
      status:  "Plein",
      
      
    },
    
  ]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
 
  const handleEditClick = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setIsEditModalOpen(true);
  };
  const handleDeleteClick = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setIsDeleteModalOpen(true);
  };

  

  const confirmDelete = () => {
    if (selectedConsultation) {
      setConsultations((prev) => prev.filter((c) => c.id !== selectedConsultation.id));
      setIsDeleteModalOpen(false);
      setSelectedConsultation(null);
    }
  };

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
          <button
            className="px-4 py-2 bg-[#08A3DC] text-white rounded-md hover:bg-[#067aa6] w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Ajouter une Consultation
          </button>
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
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 w-full sm:w-auto">
            Rechercher
          </button>
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
                    <td className="p-3">{c.status}</td>
                    <td className="p-3 text-center flex gap-2 justify-center flex-wrap">
                      <button
                      
                        onClick={() => handleEditClick(selectedConsultation!)}
                        className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                       
                        onClick={() => handleDeleteClick(selectedConsultation!)}
                        className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        <FaTrash />
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
      {isModalOpen && (
        // <div className="fixed inset-0 flex justify-center items-center p-4 z-50">
        //   <div className="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>
        //   <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative z-10 mx-2 sm:mx-4">
        //     <div className="flex justify-between items-center mb-4">
        //       <h2 className="text-lg font-semibold">Ajouter une Consultation</h2>
        //       <button onClick={() => setIsModalOpen(false)}>✖</button>
        //     </div>

           
        //   </div>
        // </div>
        <AddConsultation onClose={() => setIsModalOpen(false)} />
      )}

      {/* MODAL SUPPRESSION */}
      {isDeleteModalOpen && (
        // <div className="fixed inset-0 flex justify-center items-center p-4 z-50">
        //   <div className="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>
        //   <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative z-10 mx-2 sm:mx-4">
        //     <h3 className="text-lg font-bold mb-4 text-red-600">
        //       Voulez-vous vraiment supprimer cette consultation ?
        //     </h3>
        //     <p className="mb-6 text-black dark:text-white">
        //       Cliquer sur <span className="font-semibold">Valider</span> pour effectuer votre action.
        //     </p>
        //     <div className="flex justify-end gap-4">
        //       <button
        //         onClick={() => setIsDeleteModalOpen(false)}
        //         className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        //       >
        //         Annuler
        //       </button>
        //       <button
        //         onClick={confirmDelete}
        //         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        //       >
        //         Valider
        //       </button>
        //     </div>
        //   </div>
        // </div>
        <DeleteConsultation onSucces={confirmDelete} onClose={() => setIsDeleteModalOpen(false)} />
      )}

      {/* MODAL MODIFICATION */}
      {isEditModalOpen && (
        <EditConsultation onClose={() => setIsEditModalOpen(false)} />
      )}
    
    </div>
  );
}
