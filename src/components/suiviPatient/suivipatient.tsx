"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { listSuivisByPatient } from "@/app/admin/(others-pages)/suiviPatient/action";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";
import { deleteSuivi } from "@/app/admin/(others-pages)/suiviPatient/action";
import DeleteSuivi from "@/components/suiviPatient/DeleteSuivi";
import DetailSuivi from "@/components/suiviPatient/DetailSuivi";
import AddSuivi from "./AddSuivi";

// Type du suivi
type Suivi = {
  id: number;
  description: string;
  prescription: string;
  fichier: string;
  createdAt: string;
  updatedAt: string;
  patient: any
  user: any
};

export default function SuiviPatientPage() {
  const { id } = useParams(); 
  const patientId = Number(id); 
  const [suivis, setSuivis] = useState<Suivi[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSuivi, setSelectedSuivi] = useState<Suivi | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    

  useEffect(() => {
    async function loadSuivis() {
      try {
        const result = await listSuivisByPatient(patientId);
        if (result.success) {
          setSuivis(
            (result.data ?? []).map((suivi: any) => ({
              ...suivi,
              createdAt: suivi.createdAt instanceof Date ? suivi.createdAt.toISOString() : suivi.createdAt,
              updatedAt: suivi.updatedAt instanceof Date ? suivi.updatedAt.toISOString() : suivi.updatedAt,
              patient: {
                ...suivi.patient,
                createdAt: suivi.patient.createdAt instanceof Date ? suivi.patient.createdAt.toISOString() : suivi.patient.createdAt,
                updatedAt: suivi.patient.updatedAt instanceof Date ? suivi.patient.updatedAt.toISOString() : suivi.patient.updatedAt,
              },
            }))
          );
        } else {
          setSuivis([]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des suivis :", error);
        setSuivis([]);
      }
    }

    if (patientId) {
      loadSuivis();
    }
  }, [patientId]);
  const handleDetailClick = (suivi: Suivi) => {
    setSelectedSuivi(suivi);
    setIsDetailModalOpen(true);
  }

  const handleDeleteClick = (suivi: Suivi) => {
    setSelectedSuivi(suivi);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedSuivi) {
      const result = await deleteSuivi(selectedSuivi.id);
      if (result.success) {
        toast.success(result.message);
        setSuivis(suivis.filter((s) => s.id !== selectedSuivi.id));
      } else {
        toast.error(result.message);
      }
      setIsDeleteModalOpen(false);
      setSelectedSuivi(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <h1 className="text-xl font-bold mb-4">
          Suivi du patient {patientId}
        </h1>
        <button
          className="px-4 py-2 bg-[#08A3DC] text-white rounded-md hover:bg-[#067aa6] w-full sm:w-auto"
         onClick={() => setIsModalOpen(true)}
        >
          Ajouter des informations
        </button>
      </div>

      {suivis.length > 0 ? (
        <table className="min-w-full border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2 text-left">Médecin</th>
              <th className="px-4 py-2 text-left">Date de création</th>
              <th className="px-4 py-2 text-left">Dernière de modifiaction</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suivis.map((s) => (
              <tr key={s.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">{s.user?.name ?? "—"}</td>
                <td className="px-4 py-2">{new Date(s.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(s.updatedAt).toLocaleDateString()}</td>
                <td className="p-3 text-center flex gap-2 justify-center flex-wrap">
                      <button 
                        onClick={() => handleDetailClick(s)}
                      className=" border-[#08A3DC] rounded-[5px] dark:hover:bg-[#08A3DC] bg-gray-200 dark:bg-transparent border-1  hover:bg-[#08A3DC] hover:text-white transition">
                        <Eye />
                      </button> 
                      <button
                     
                        className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC]  hover:text-white transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(s)}
                        className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun suivi trouvé pour ce patient.</p>
      )}

      {isDeleteModalOpen && selectedSuivi && (
        <DeleteSuivi 
          onClose={() => setIsDeleteModalOpen(false)} 
          onSucces={handleConfirmDelete} 
        />
      )}
        {isModalOpen && (
        <AddSuivi
          onClose={() => setIsModalOpen(false)}
          onSuccess={(newSuivi) => setSuivis([newSuivi, ...suivis])}
            initialDescription={`Suivi pour le patient ID: ${patientId}`}
            patientId={patientId}
        />
        )}
        {isDetailModalOpen && selectedSuivi && (
        <DetailSuivi 
          suivi={selectedSuivi}
            onClose={() => {
                setIsDetailModalOpen(false);
                setSelectedSuivi(null);
            }}
        />
        )}
    </div>
  );
}
