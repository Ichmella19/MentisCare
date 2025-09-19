"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { listPatients } from "@/app/admin/(others-pages)/patients/action";
import { Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "react-toastify";
import { deletePatient } from "@/app/admin/(others-pages)/patients/action";
import AddPatient from "@/components/patient/AddPatient";
import DeletePatient from "@/components/patient/DeletePatient";
import EditPatient from "@/components/patient/EditPatient";
import DetailPatient from "@/components/patient/DetailPatient";
import { Paginate } from "../Paginate";

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
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const searchParam = useSearchParams();
  const page = parseInt(searchParam?.get("page") || "1");
  const param = searchParam?.get("search") ?? "";
  
  const [totalPages, setTotalPages] = useState(1); // Pour la pagination
  
  const router = useRouter(); 
  useEffect(() => {
    async function loadPatients() {
      try {
        const result = await listPatients(page, search);

        if (result.success && result.data) {
          setPatients(
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          
          setTotalPages(result.data.totalPages)
        } else {
          setPatients([]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des patients :", error);
        setPatients([]);
      }
    }

    loadPatients();
  }, [search]);

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
      // Supprime l'utilisateur du state
      setPatients((prevPatients) => prevPatients.filter((u) => u.id !== selectedPatient.id));
      toast.success(result.message);
      setIsDeleteModalOpen(false);
      setSelectedPatient(null);
      // router.refresh(); // Actualiser la page pour refléter les changements
      router.push('/admin/patients');
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
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
       Patients
      </h1>
     <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold">Historiques des Patients</h2>
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
            className="w-full p-2 border rounded-md"
          />
        </div>


      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow rounded-lg text-sm md:text-base">
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
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2">{patient.name}</td>

                  {/* Email + Téléphone */}
                  <td className="px-4 py-2">
                    <div className="flex flex-col">
                      <span className="break-words">{patient.email}</span>
                      <span className="">{patient.phone}</span>
                    </div>
                  </td>

                  {/* Adresse + Pays */}
                  <td className="px-4 py-2">
                    <div className="flex flex-col">
                      <span>{patient.adresse}</span>
                      <span className="">{patient.pays}</span>
                    </div>
                  </td>

                  <td className="px-4 py-2">{patient.sexe}</td>
                  <td className="px-4 py-2">{patient.dateNaissance}</td>

                  <td className="p-3 text-center flex gap-2 justify-center ">
                    <button 
                     onClick={() => handleDetailClick(patient)}
                    className="border-[#08A3DC] rounded-[5px]  border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] hover:text-white transition">
                      <Eye />
                    </button>
                    <button
                      onClick={() => handleEditClick(patient)}
                      className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(patient)}
                      className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-3 text-center text-gray-500">
                  Aucun patient trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div>
          { totalPages === 1 ? ''
              :<Paginate pages ={totalPages} currentPage={page} path="/admin/patients" param={param} />
          }
      </div>
      </div>
      {/* Modal Ajout */}
      {isModalOpen && <AddPatient onClose={() => setIsModalOpen(false)} />}

      {/* Modal Suppression */}
      {isDeleteModalOpen && selectedPatient && (
        <DeletePatient 
          onClose={() => setIsDeleteModalOpen(false)} 
          onSucces={confirmDelete} 
        />
      )}
      {isDetailModalOpen && selectedPatient && (
  <DetailPatient 
        patient={selectedPatient}
    onClose={() => setIsDetailModalOpen(false)} />
      )}

      {/* Modal Modification */}
      {isEditModalOpen &&  selectedPatient &&(
        <EditPatient 
        patient={selectedPatient}
    onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
}
