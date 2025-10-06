"use client";
import { histories } from "@/app/admin/(others-pages)/portfeuille/action";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

interface Don {
  nom: string;
  montant: number;
  phone: string;
  email: string;
  createdAt?: Date;
}

const dons: Don[] = [
  { nom: "Jean Dupont", montant: 5000, phone: "61000000", email: "jean@mail.com" },
  { nom: "Marie Claire", montant: 10000, phone: "62000000", email: "marie@mail.com" },
  { nom: "David John", montant: 7500, phone: "63000000", email: "david@mail.com" },
];

export default function PortefeuillePage() {
  const [dons, setDons] = useState<Don[]>([]);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1); // Pour la pagination
  const [sum, setSum] = useState(0); // Pour la somme totale
  const [total, setTotal] = useState(0); // Pour le total des dons

  const searchParam = useSearchParams();
  const page = parseInt(searchParam?.get("page") || "1");
  const param = searchParam?.get("search") ?? "";
    
  const sommeTotale = dons.reduce((acc, don) => acc + don.montant, 0);
  const nombreDons = dons.length;

  useEffect(() => {
      async function loadDons() {
        try {
          const result = await histories(page, search);
  
          if (result.success && result.data) {
            console.log(result.data.dons);
            setDons(
              result.data.dons
            );
            setTotalPages(result.data.totalPages)
            setSum(result.data.sum._sum.montant || 0);
            setTotal(result.data.total);
          } else {
            setDons([]);
          }
        } catch (error) {
          console.error("Erreur lors du chargement des patients :", error);
          setDons([]);
        }
      }
  
      loadDons();
    }, [search]);
  

  return (
    <div className="p-6 bg-white dark:bg-black text-black dark:text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h1 className="text-2xl font-bold mb-6">Portefeuille</h1>

      {/* Grille avec somme et nombre */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className=" shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold">Somme totale recueillie</h2>
          <p className="text-2xl font-bold text-green-600">{sum} XOF</p>
        </div>
        <div className=" shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold">Nombre total de dons</h2>
          <p className="text-2xl font-bold text-blue-600">{total}</p>
        </div>
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
      {/* Tableau */}
      <div className=" shadow-md rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className=" text-left">
              <th className="p-4 border-b">Nom</th>
              <th className="p-4 border-b">Montant (XOF)</th>
              <th className="p-4 border-b">Téléphone</th>
              <th className="p-4 border-b">Email</th>
              <th className="p-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {dons.map((don, index) => (
              <tr key={index} className="">
                <td className="p-4 border-b">{don.nom}</td>
                <td className="p-4 border-b">{don.montant} XOF</td>
                <td className="p-4 border-b">{don.phone}</td>
                <td className="p-4 border-b">{don.email}</td>
                <td className="p-4 border-b">{don.createdAt?.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
