"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { listReservationsByCalendar } from "@/app/(home)/reservation/action"; // ajuste le chemin
import { Paginate } from "@/components/Paginate";

type Reservation = {
  id: number;
  nom: string;
  email: string;
  phone: string;
  description: string;
  adresse: string;
    calendarId: number;
  createdAt: string;
};

export default function ConsultationDetailsPage() {
  const { id } = useParams(); // récupère l'id de la consultation
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1); // Pour la pagination
  const page = 1; // ou gérer avec searchParams si pagination

  useEffect(() => {
    const fetchReservations = async () => {
      if (!id) return;
      const result = await listReservationsByCalendar(Number(id));
      if (result.success) {
        setReservations(result.data);
      } else {
        setReservations([]);
        console.error(result.message);
      }
    };
    fetchReservations();
  }, [id]);

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
              <th className="p-3">Créé le</th>
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
                  <td className="p-3">{new Date(r.createdAt).toLocaleDateString("fr-FR")}</td>
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
    </div>
  );
}
