"use client";
import React from "react";


type Reservation = {
  id: number;
  category: { name: string };
  quantity: number;
  stock: number;
  date: Date;
  heureDebut: string;
  heureFin: string;
  createdAt: Date;
};

type Props = {
  reservations: Reservation[]; // <-- on rend la prop optionnelle
};

export default function ReservationPage({ reservations = [] }: Props) {
    console.log("Reservations reçues:", reservations);
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations.map((r) => (
            <div
              key={r.id}
              className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700"
            >
              <div>
                <h2 className="text-xl font-semibold text-[#08A3DC] mb-2">
                  {r.category?.name ?? "Inconnu"}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Quantité :</span> {r.quantity}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Stock :</span> {r.stock}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Heure :</span> {r.heureDebut} -{" "}
                  {r.heureFin}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Date :</span>{" "}
                  {new Date(r.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <span className="font-semibold">Ajouté le :</span>{" "}
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() =>
                  alert(`Rendez-vous réservé pour ${r.category?.name}`)
                }
                className="mt-4 bg-[#08A3DC] text-white px-4 py-2 rounded-lg hover:bg-[#0b91c6] transition duration-200"
              >
                Prendre rendez-vous
              </button>
            </div>
          ))}
        </div>
  
    </div>
  );
}
