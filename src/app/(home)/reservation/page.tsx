"use client";
import Header from "@/components/(home)/header/header";
import { motion } from "framer-motion";
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
    <div className= {`min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white`}style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <main className="flex-1">

       <Header />
          <div className="bg-[#2E86AB] text-white py-[120px] px-6 md:px-24 text-center">
          <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl font-extrabold mb-6">MentisCare</motion.h1>
            <p className="text-xl font-medium mx-auto max-w-3xl">
              Une initiative humaine et technologique pour redonner de l'espoir à ceux que la société oublie trop souvent.
            </p>
          </div>
    

     
        <section className= {`py-16 px-6 lg:px-20`} >
          
    
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
        </section>
      </main>
    </div>
  );
}
