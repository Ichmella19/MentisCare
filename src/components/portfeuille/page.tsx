"use client";
import React from "react";

interface Don {
  nom: string;
  montant: number;
  phone: string;
  email: string;
}

const dons: Don[] = [
  { nom: "Jean Dupont", montant: 5000, phone: "61000000", email: "jean@mail.com" },
  { nom: "Marie Claire", montant: 10000, phone: "62000000", email: "marie@mail.com" },
  { nom: "David John", montant: 7500, phone: "63000000", email: "david@mail.com" },
];

export default function PortefeuillePage() {
  // Calcul des totaux
  const sommeTotale = dons.reduce((acc, don) => acc + don.montant, 0);
  const nombreDons = dons.length;

  return (
    <div className="p-6 bg-white dark:bg-black text-black dark:text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h1 className="text-2xl font-bold mb-6">Portefeuille</h1>

      {/* Grille avec somme et nombre */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className=" shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold">Somme totale recueillie</h2>
          <p className="text-2xl font-bold text-green-600">{sommeTotale} FCFA</p>
        </div>
        <div className=" shadow-md rounded-xl p-6">
          <h2 className="text-lg font-semibold">Nombre total de dons</h2>
          <p className="text-2xl font-bold text-blue-600">{nombreDons}</p>
        </div>
      </div>

      {/* Tableau */}
      <div className=" shadow-md rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className=" text-left">
              <th className="p-4 border-b">Nom</th>
              <th className="p-4 border-b">Montant (FCFA)</th>
              <th className="p-4 border-b">Téléphone</th>
              <th className="p-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {dons.map((don, index) => (
              <tr key={index} className="">
                <td className="p-4 border-b">{don.nom}</td>
                <td className="p-4 border-b">{don.montant}</td>
                <td className="p-4 border-b">{don.phone}</td>
                <td className="p-4 border-b">{don.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
