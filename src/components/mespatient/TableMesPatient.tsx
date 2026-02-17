"use client";

import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Paginate } from "../Paginate";
import { MyPatients } from "@/app/admin/(others-pages)/mespatients/action";

// Définition du type Patient
type Patient = {
  id: number;
  name: string;
  email: string;
  phone: string;
  adresse: string;
  pays: string;
  sexe: string;
  dateNaissance: string;
};

export default function TablePatient() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");

  const searchParam = useSearchParams();
  const page = parseInt(searchParam?.get("page") || "1");
  const param = searchParam?.get("search") ?? "";

  const [totalPages, setTotalPages] = useState(1);

  // 🔥 STATES DE LOADING & ERROR
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function loadPatients() {
      setLoading(true);
      setError(null);

      try {
        const result = await MyPatients(page, search);

        if (result.success && result.data) {
          setPatients(
            result.data.patients.map((p: any) => ({
              id: p.id,
              name: p.name ?? "",
              email: p.email ?? "",
              phone: p.phone ?? "",
              adresse: p.adresse ?? "",
              sexe: p.sexe ?? "",
              dateNaissance: p.dateNaissance ?? "",
              pays: p.pays ?? "",
            }))
          );
          setTotalPages(result.data.totalPages);
        } else {
          setPatients([]);
          setError("Erreur lors du chargement des patients");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des patients :", error);
        setPatients([]);
        setError("Erreur serveur lors du chargement");
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, [search, page]);

  return (
    <div
      className="p-4 md:p-6 bg-white text-black dark:bg-black dark:text-white min-h-screen"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        Mes Patients
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold">Historiques des Mes Patients</h2>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* TABLE / LOADER */}
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
          {loading ? (
           <div className="flex flex-col items-center justify-center py-10">
              <div className="w-10 h-10 border-4 border-[#08A3DC]/30 border-t-[#08A3DC]rounded-full animate-spin"></div>
              <p className="mt-3 text-gray-600 dark:text-gray-300 font-medium">
                Chargement de mes patients...
              </p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : patients.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucun patient trouvé
            </div>
          ) : (
            <table className="min-w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">Nom</th>
                  <th className="px-4 py-2 text-left">Contact</th>
                  <th className="px-4 py-2 text-left">Adresse</th>
                  <th className="px-4 py-2 text-left">Sexe</th>
                  <th className="px-4 py-2 text-left">Date de naissance</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2">{patient.name}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col">
                        <span className="break-words">{patient.email}</span>
                        <span>{patient.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col">
                        <span>{patient.adresse}</span>
                        <span>{patient.pays}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">{patient.sexe}</td>
                    <td className="px-4 py-2">{patient.dateNaissance}</td>
                    <td className="p-3 text-center flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          router.push(`/admin/suiviPatient/${patient.id}`)
                        }
                        className="border-[#08A3DC] rounded-[5px] border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] hover:text-white transition"
                      >
                        <Eye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Paginate
            pages={totalPages}
            currentPage={page}
            path="/admin/patients"
            param={param}
          />
        )}
      </div>
    </div>
  );
}
