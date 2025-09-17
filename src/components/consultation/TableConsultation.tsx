"use client";
import { useEffect, useState } from "react";
import AddConsultation from "@/components/consultation/AddConsultation";

type Consultation = {
  id: number;
  categorie: string;
  quantite: number;
  stock: number;
  createdAt: string;
};

export default function TableConsultation() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ ajouté pour gérer le modal

  // Charger les données de Calendar
  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const res = await fetch("/api/consultations");
        const data = await res.json();
        setConsultations(data || []);
      } catch (error) {
        console.error("Erreur lors du fetch des consultations:", error);
      }
    };
    fetchConsultations();
  }, []);

  const filteredConsultations = consultations.filter((c) =>
    c.categorie?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="p-6 bg-white text-black dark:bg-black dark:text-white min-h-screen"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <h1 className="text-2xl font-bold mb-6">Consultations</h1>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <button
            className="px-4 py-2 bg-[#08A3DC] text-white rounded-md hover:bg-[#067aa6] w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)} // ✅ fonctionne maintenant
          >
            Ajouter une consultation
          </button>
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
                <th className="p-3">Stock</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredConsultations.length > 0 ? (
                filteredConsultations.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-3">{c.id}</td>
                    <td className="p-3">{c.categorie}</td>
                    <td className="p-3">{c.quantite}</td>
                    <td className="p-3">{c.stock}</td>
                    <td className="p-3">
                      {new Date(c.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))
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
      </div>

      {/* Modal (placeholder pour l’instant) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Ajouter une catégorie</h2>
            {/* Ici tu mettras ton formulaire */}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
        {/* Modal Ajout */}
      {isModalOpen && <AddConsultation onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
