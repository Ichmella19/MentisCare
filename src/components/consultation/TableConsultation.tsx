"use client";

import React, { useEffect, useState } from "react";
import DeleteConsultation from "@/components/consultation/DeleteConsultation";
import {
  deleteConsultation,
  listConsultations,
} from "@/app/admin/(others-pages)/consultations/action";

import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Paginate } from "../Paginate";

type Consultation = {
  id: number;
  category: any;
  user: any;
  date: string;
  heureDebut: string;
  heureFin: string;
  quantity: number;
  stock: number;
  createdAt: string;
};

export default function TableConsultation() {
  const router = useRouter();
  const searchParam = useSearchParams();

  const page = parseInt(searchParam?.get("page") || "1");
  const param = searchParam?.get("search") ?? "";

  const [calendars, setCalendars] = useState<Consultation[]>([]);
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(null);

  const [search, setSearch] = useState(param);
  const [totalPages, setTotalPages] = useState(1);

  // 🔥 STATES DE LOADING (COMME CATÉGORIES)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // =========================
  // CHARGEMENT DES DONNÉES
  // =========================
  useEffect(() => {
    const fetchConsultations = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await listConsultations(page, search);

        if (result.success && result.data) {
          setCalendars(
            result.data.calendars.map((item: any) => ({
              id: item.id,
              category: item.category,
              user: item.user ?? {},
              date: item.date ? item.date.toString() : "",
              heureDebut: item.heureDebut,
              heureFin: item.heureFin,
              quantity: item.quantity,
              stock: item.stock,
              createdAt: item.createdAt
                ? item.createdAt.toString()
                : "",
            }))
          );
          setTotalPages(result.data.totalPages);
        } else {
          setCalendars([]);
          setError(
            result.message ||
              "Erreur lors du chargement des consultations"
          );
        }
      } catch (err) {
        console.error(err);
        setError("Erreur serveur lors du chargement");
        setCalendars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, [search, page]);

  // =========================
  // ACTIONS
  // =========================
  const handleDeleteClick = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setIsDeleteModalOpen(true);
  };

  const handleDetailClick = (consultation: Consultation) => {
    router.push(`/admin/consultations/${consultation.id}`);
  };

  const confirmDelete = async () => {
    if (!selectedConsultation) return;

    try {
      const result = await deleteConsultation(selectedConsultation.id);

      if (result.success) {
        toast.success(result.message);
        setIsDeleteModalOpen(false);
        setSelectedConsultation(null);
        router.push("/admin/consultations");
      } else {
        toast.error(
          result.message || "Erreur lors de la suppression."
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div
      className="p-6 bg-white text-black dark:bg-black dark:text-white min-h-screen"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <h1 className="text-2xl font-bold mb-6">
        Historique des consultations
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6">
        {/* Recherche */}
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
              <div className="w-10 h-10 border-4 border-[#08A3DC]/30 border-t-[#08A3DC] rounded-full animate-spin"></div>
              <p className="mt-3 text-gray-600 dark:text-gray-300 font-medium">
                Chargement des consultations...
              </p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">
              {error}
            </div>
          ) : calendars.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune consultation trouvée
            </div>
          ) : (
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="p-3">Catégorie</th>
                  <th className="p-3">Quantité</th>
                  <th className="p-3">Place prise</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {calendars.map((calendar) => (
                  <tr
                    key={calendar.id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-3">
                      {calendar.category?.name}
                    </td>
                    <td className="p-3">{calendar.quantity}</td>
                    <td className="p-3">{calendar.stock}</td>
                    <td className="p-3">
                      {new Date(
                        calendar.createdAt
                      ).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="p-3 flex gap-2 justify-center">
                      <button
                        onClick={() => handleDetailClick(calendar)}
                        className="border-[#08A3DC] rounded-[5px] bg-gray-200 hover:bg-[#08A3DC] hover:text-white transition"
                      >
                        <Eye />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteClick(calendar)
                        }
                        className="border-[#08A3DC] rounded-[5px] p-1 bg-gray-200 hover:bg-[#08A3DC] hover:text-white transition"
                      >
                        <FaTrash />
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
            path="/admin/consultations"
            param={search}
          />
        )}
      </div>

      {/* MODAL SUPPRESSION */}
      {isDeleteModalOpen && selectedConsultation && (
        <DeleteConsultation
          onClose={() => setIsDeleteModalOpen(false)}
          onSucces={confirmDelete}
        />
      )}
    </div>
  );
}
