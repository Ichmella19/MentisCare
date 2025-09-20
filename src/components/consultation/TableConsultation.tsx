"use client";

import React, { useEffect, useState } from "react";
 import DeleteConsultation from "@/components/consultation/DeleteConsultation";
import { deleteConsultation, listConsultations } from "@/app/admin/(others-pages)/consultations/action";

import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Paginate } from "../Paginate";

type Consultation = {
               
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any;
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  id :number;
  date:string;
  heureDebut: string;
  heureFin: string;
  quantity: number;
  stock: number;
  createdAt: string;
};


export default function TableConsultation() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [calendars, setCalendars] = useState<Consultation[]>([]);
  const [search, setSearch] = useState("");
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  

  const searchParam = useSearchParams();
  const page = parseInt(searchParam?.get("page") || "1");
  const param = searchParam?.get("search") ?? "";
  
  const [totalPages, setTotalPages] = useState(1); // Pour la pagination


 useEffect(() => {
     const fetchConsultations = async () => {
       try {
         const result = await listConsultations(page,search);
         if (result.success && result.data) {
           setCalendars(
                         
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
             result.data.calendars.map((item: any) => ({
               id: item.id,
               category: item.category,
               user: item.user ?? {}, // fallback to empty object if missing
               date: item.date ? item.date.toString() : "",
               heureDebut: item.heureDebut,
               heureFin: item.heureFin,
               quantity: item.quantity,
               stock: item.stock,
               createdAt: item.createdAt ? item.createdAt.toString() : "",
             }))
           );
          setTotalPages(result.data.totalPages)

         } else {
           setCalendars([]);
         }
       } catch (error) {
         console.error("Erreur lors du chargement des catégories :", error);
         setCalendars([]);
       }
     };
     fetchConsultations();
   }, [search]);

  const handleDeleteClick = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setIsDeleteModalOpen(true);
  };
  const router = useRouter();
  const handleDetailClick = (calendar: Consultation) => {
    router.push(`/admin/consultations/${calendar.id}`);
  };

   const confirmDelete = async () => {
    if (!selectedConsultation) return;
  
    try {
      const result = await deleteConsultation(selectedConsultation.id); 
  
      if (result.success) {
        // Supprime l'utilisateur du state
       
        toast.success(result.message);
        setIsDeleteModalOpen(false);
        setSelectedConsultation(null);
        // router.refresh(); // Actualiser la page pour refléter les changements
        router.push('/admin/consultations');
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
                <th className="p-3">Place Prise</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {calendars.length > 0 ? (
                calendars.map((calendar) => {
                  return (
                    <tr
                      key={calendar.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="p-3">{calendar.category.name}</td>
                      <td className="p-3">{calendar.quantity}</td>
                      <td className="p-3">{calendar.stock}</td>
                      <td className="p-3">
                        {new Date(calendar.createdAt).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="p-3 text-center flex gap-2 justify-center ">     
                        <button 
                        onClick={() => handleDetailClick(calendar)}
                        className="border-[#08A3DC] rounded-[5px]  border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] hover:text-white transition">
                        <Eye />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(calendar)}
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
          { totalPages === 1 ? ''
              :<Paginate pages ={totalPages} currentPage={page} path="/admin/consultations" param={param} />
          }
      </div>   
        {/* Modal Suppression */}
            {isDeleteModalOpen && selectedConsultation && (
              <DeleteConsultation 
                onClose={() => setIsDeleteModalOpen(false)} 
                onSucces={confirmDelete} 
              />
            )}
    </div>
  );
}
