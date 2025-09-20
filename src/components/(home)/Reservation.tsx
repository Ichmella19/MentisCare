"use client";
import { listReservations } from "@/app/(home)/reservation/action";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "./header/header";
import { Paginate } from "../Paginate";
import ModalReservation from "@/components/(home)/ModalReservation";
// import { useRouter } from "next/navigation";
// import { makeReservation } from "@/app/(home)/reservation/action"; // ✅ vérifie le chemin


type Reservation = {
  category: any;
  user: any;
  id :number;
  date:string;
  heureDebut: string;
  heureFin: string;
  quantity: number;
  stock: number;
  createdAt: string;
};

type Props = {
  reservations: Reservation[]; // <-- on rend la prop optionnelle
};

export default function ReservationPage( {}: Props) {
    
      const [calendars, setCalendars] = useState<Reservation[]>([]);
      const [search, setSearch] = useState("");
      const [isModalOpen, setIsModalOpen] = useState(false);
    //  const router = useRouter();
  // const [selectedReservation, setSelectedReservation] = useState<Partial<Reservation>>({});
      const searchParam = useSearchParams();
      const page = parseInt(searchParam?.get("page") || "1");
      const param = searchParam?.get("search") ?? "";
      
      const [totalPages, setTotalPages] = useState(1); // Pour la pagination
    
    
     useEffect(() => {
         const fetchConsultations = async () => {
           try {
             const result = await listReservations(page,search);
             if (result.success && result.data) {
               setCalendars(
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
    

  return (
    <div className= "bg-white text-black dark:bg-black dark:text-white"style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Header />
      {/* Hero */}
      <div className="bg-[#2E86AB] text-white py-[120px] px-6 md:px-24 text-center">
        <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl font-extrabold mb-6">MentisCare</motion.h1>
        <p className="text-xl max-w-3xl mx-auto">Une plateforme numérique pour soutenir les personnes en détresse mentale dans les milieux défavorisés au Bénin.</p>
      </div>

        <div className="max-w-7xl mx-auto px-6 py-10">
    
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calendars.map((r) => (
                <div
                key={r.id}
                className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700"
                >
                <div>
                    <h2 className="text-xl font-semibold text-[#08A3DC] mb-2 uppercase text-center">
                    {r.category?.name ?? "Inconnu"}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Quantité :</span> {r.quantity}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Heure :</span> {r.heureDebut} -{" "}
                    {r.heureFin}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Date :</span>{" "}
                    {new Date(r.date).toLocaleDateString()}
                    </p>
                    <h3 className="font-semibold text-[#08A3DC] mb-2 text-right">
                       Spécialiste:  {r.user.name}
                    </h3>
                </div>

                <button
                        onClick={() => setIsModalOpen(true)}
                    className="mt-4 bg-[#08A3DC] text-white px-4 py-2 rounded-lg hover:bg-[#0b91c6] transition duration-200"
                >
                    Prendre rendez-vous
                </button>
                </div>
            ))}
            </div>
            <div>
                { totalPages === 1 ? ''
                    :<Paginate pages ={totalPages} currentPage={page} path="/reservation" param={param} />
                }
            </div>
    
        </div>
         {/* Modal Ajout */}
<ModalReservation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={{}} // tu peux mettre des valeurs par défaut si tu veux pré-remplir
        onSubmit={(values) => {
          // Gère la soumission du formulaire ici
          console.log("Form submitted with values:", values);
        }}
      />    </div>  
  );
}
