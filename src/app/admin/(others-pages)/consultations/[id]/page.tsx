"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { listReservationsByCalendar } from "@/app/(home)/reservation/action"; // ajuste le chemin
import { Paginate } from "@/components/Paginate";
import { validateConsultation } from "../action";
import { toast } from "react-toastify";
import ValidateConsultation from "@/components/consultation/ValidateConsultation";

type Reservation = {
  id: number;
  nom: string;
  email: string;
  phone: string;
  description: string;
  adresse: string;
  calendarId: number;
  status: boolean;
  createdAt: Date;
};

export default function ConsultationDetailsPage() {
  const { id } = useParams(); // récupère l'id de la consultation
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1); // Pour la pagination
  const page = 1; // ou gérer avec searchParams si pagination

  
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!id) return;
      const result = await listReservationsByCalendar(Number(id));
      if (result.success) {
        setReservations(result.data ?? []);
      } else {
        setReservations([]);
        console.error(result.message);
      }
    };
    fetchReservations();
  }, [id]);

  const handleValidateClick = (consultation: Reservation) => {
    setSelectedReservation(consultation);
    setIsDeleteModalOpen(true);
  };

  const confirm = async () => {
      if (!selectedReservation) return;
    
      try {
        const result = await validateConsultation(selectedReservation.id); 
    
        if (result.success) {
         
          toast.success(result.message);
          setIsDeleteModalOpen(false);
          setSelectedReservation(null);
          // Met à jour la liste des réservations
          const updatedReservations = reservations.map((r) =>
            r.id === selectedReservation.id ? { ...r, status: true } : r
          );
          setReservations(updatedReservations);
        } else {
          toast.error(result.message || "Erreur lors de la suppression.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Erreur serveur");
      }
    };

  return (
    <div className="p-6 bg-white dark:bg-black dark:text-white min-h-screen" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h1 className="text-2xl font-bold mb-6">
        Réservations pour le créneau {id}
      </h1>

      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left">
              <th className="p-3">Nom</th>
              <th className="p-3">Email</th>
              <th className="p-3">Téléphone</th>
              <th className="p-3">Adresse</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Créé le</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-3">{r.nom}</td>
                  <td className="p-3">{r.email}</td>
                  <td className="p-3">{r.phone}</td>
                  <td className="p-3">{r.adresse}</td>
                  <td className="p-3">
                    {r.status ? (
                      <span className="text-green-600 font-semibold">Confirmée</span>
                    ) : (
                      <span className="text-red-600 font-semibold">En attente</span>
                    )}
                  </td>
                  <td className="p-3">{new Date(r.createdAt).toLocaleDateString("fr-FR")}</td>
                  <td className="p-3 text-center flex gap-2 justify-center ">     
                        <button 
                        onClick={ () => handleValidateClick(r)}
                        className="border-[#08A3DC] rounded-[5px]  border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] hover:text-white transition">
                        {/* Replace Tool with a valid icon, e.g. FontAwesome or Heroicons */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.364-6.364a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-5.656 0 4 4 0 010-5.656l6.364-6.364a2 2 0 112.828 2.828L9 13z" />
                        </svg>
                        </button>
                      </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center text-gray-500">
                  Aucune réservation
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && <Paginate pages={totalPages} currentPage={page} path={`/consultation/${id}`} param={search} />}
      
    {/* Modal Validate */}
                {isDeleteModalOpen && selectedReservation&& (
                  <ValidateConsultation 
                    onClose={() => setIsDeleteModalOpen(false)} 
                    onSucces={confirm} 
                  />
                )}
    </div>
  );
}
