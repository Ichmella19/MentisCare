"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { listPatients, deletePatient } from "@/app/admin/(others-pages)/patients/action";
import { Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import AddPatient from "@/components/patient/AddPatient";
import DeletePatient from "@/components/patient/DeletePatient";
import EditPatient from "@/components/patient/EditPatient";
import DetailPatient from "@/components/patient/DetailPatient";
import { Paginate } from "../Paginate";

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  adresse: string;
  pays: string;
  sexe: string;
  dateNaissance: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

// Type pour les données brutes de l'API (flexible)
interface RawPatientData {
  id: number | string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  adresse?: string | null;
  pays?: string | null;
  sexe?: string | null;
  dateNaissance?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

interface ListPatientsResult {
  success: boolean;
  data?: {
    patients?: RawPatientData[]; // possible key
    users?: RawPatientData[];    // fallback key (au cas où API renommerait)
    totalPages: number;
  };
  message?: string;
}

// ----------------------------------------------------------------------
// COMPOSANT
// ----------------------------------------------------------------------

export default function TablePatient() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const page = parseInt(searchParam?.get("page") || "1");
  const param = searchParam?.get("search") ?? "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    async function loadPatients() {
      setLoading(true);
      setError(null);

      try {
        const result = (await listPatients(page, search)) as ListPatientsResult;

        if (result.success && result.data) {
          const rawList = result.data.patients ?? result.data.users ?? [];
          const mapped = rawList.map((p: RawPatientData): Patient => ({
            id: Number(p.id),
            name: p.name ?? "",
            email: p.email ?? "",
            phone: p.phone ?? "",
            adresse: p.adresse ?? "",
            sexe: p.sexe ?? "",
            dateNaissance: p.dateNaissance ?? "",
            user: p.user ?? null,
            pays: p.pays ?? "",
          }));
          setPatients(mapped);
          setTotalPages(result.data.totalPages ?? 1);
        } else {
          setError(result.message || "Erreur lors du chargement des patients");
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError("Erreur serveur lors du chargement");
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, [page, search]);

  const handleDeleteClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleDetailClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedPatient) return;

    try {
      const result = await deletePatient(selectedPatient.id);

      if (result.success) {
        setPatients((prev) => prev.filter((p) => p.id !== selectedPatient.id));
        toast.success(result.message);
        setIsDeleteModalOpen(false);
        setSelectedPatient(null);
        router.push("/admin/patients");
      } else {
        toast.error(result.message || "Erreur lors de la suppression.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }
  };

  return (
    <div
      className="p-4 md:p-6 bg-white text-black dark:bg-black dark:text-white min-h-screen"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Patients</h1>

      {/* Card */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold">Liste des Patients</h2>
          <button
            className="px-4 py-2 bg-[#08A3DC] text-white rounded-md hover:bg-[#067aa6] w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Ajouter un Patient
          </button>
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

        {/* Table / loader */}
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-10 h-10 border-4 border-[#08A3DC]/30 border-t-[#08A3DC]rounded-full animate-spin"></div>
              <p className="mt-3 text-gray-600 dark:text-gray-300 font-medium">
                Chargement des patients...
              </p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : patients.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Aucun patient trouvé</div>
          ) : (
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="p-3">Nom</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Adresse</th>
                  <th className="p-3">Sexe</th>
                  <th className="p-3">Naissance</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-3">{patient.name}</td>
                    <td className="p-3">
                      <div className="truncate max-w-[150px]">{patient.email}</div>
                      <div>{patient.phone}</div>
                    </td>
                    <td className="p-3">
                      <div>{patient.adresse}</div>
                      <div>{patient.pays}</div>
                    </td>
                    <td className="p-3">{patient.sexe}</td>
                    <td className="p-3">{patient.dateNaissance}</td>
                    <td className="p-3 text-center flex gap-2 justify-center flex-wrap">
                      <button
                        onClick={() => handleDetailClick(patient)}
                        className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                        aria-label="Détails"
                      >
                        <Eye />
                      </button>
                      <button
                        onClick={() => handleEditClick(patient)}
                        className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                        aria-label="Modifier"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(patient)}
                        className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                        aria-label="Supprimer"
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

        {totalPages > 1 && (
          <Paginate pages={totalPages} currentPage={page} path="/admin/patients" param={param} />
        )}

        {/* Mobile view: cards */}
        <div className="block md:hidden space-y-3 mt-4">
          {patients.length > 0 ? (
            patients.map((patient) => (
              <div key={patient.id} className="p-3 border rounded-md shadow-sm flex flex-col gap-2 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="font-semibold truncate">{patient.name}</div>
                  <div className="text-sm text-gray-500">{patient.sexe}</div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 break-words">{patient.email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{patient.phone}</p>
                <div className="text-xs text-gray-500">{patient.dateNaissance}</div>
                <div className="flex flex-wrap gap-3 mt-2">
                  <button
                    onClick={() => handleEditClick(patient)}
                    className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                    aria-label="Modifier"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(patient)}
                    className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                    aria-label="Supprimer"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => handleDetailClick(patient)}
                    className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                    aria-label="Détails"
                  >
                    <Eye />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Aucun patient trouvé</p>
          )}
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && <AddPatient onClose={() => setIsModalOpen(false)} />}

      {isDeleteModalOpen && selectedPatient && (
        <DeletePatient onClose={() => setIsDeleteModalOpen(false)} onSucces={confirmDelete} />
      )}

      {isDetailModalOpen && selectedPatient && (
        <DetailPatient patient={selectedPatient} onClose={() => setIsDetailModalOpen(false)} />
      )}

      {isEditModalOpen && selectedPatient && (
        <EditPatient patient={selectedPatient} onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
}
