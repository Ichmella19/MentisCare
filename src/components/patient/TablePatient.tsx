"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import AddPatient from "@/components/patient/AddPatient";
import DeletePatient from "@/components/patient/DeletePatient";
import EditPatient from "@/components/patient/EditPatient";
import { useRouter } from "next/navigation";
// Définition du type Patient
type Patient = {
  id: number;
  name: string;
  email: string;
  phone: string;
  adresse: string;
  sexe: string;
  dateNaissance: string;
};

export default function TablePatient() {
    // const router = useRouter();
    const [patients, setPatients] = useState<Patient[]>([]);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [search, setSearch] = useState("");



  const handleDeleteClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPatient) {
      setPatients((prevPatients) =>
        prevPatients.filter((u) => u.id !== selectedPatient.id)
      );
      setIsDeleteModalOpen(false);
      setSelectedPatient(null);
    }
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="p-4 md:p-6 bg-white text-black dark:bg-black dark:text-white min-h-screen"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <h1 className="text-xl font-bold">Gestion des Patients</h1>
        <button
          className="px-4 py-2 bg-[#08A3DC] text-white rounded-md hover:bg-[#067aa6] w-full sm:w-auto"
          onClick={() => setIsModalOpen(true)}
        >
          Ajouter un Patient
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
        <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 w-full sm:w-auto">
          Rechercher
        </button>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow rounded-lg text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2 text-left">Nom</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Téléphone</th>
              <th className="px-4 py-2 text-left">Adresse</th>
              <th className="px-4 py-2 text-left">Sexe</th>
              <th className="px-4 py-2 text-left">Date de naissance</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2">{patient.name}</td>
                  <td className="px-4 py-2 break-words">{patient.email}</td>
                  <td className="px-4 py-2">{patient.phone}</td>
                  <td className="px-4 py-2">{patient.adresse}</td>
                  <td className="px-4 py-2">{patient.sexe}</td>
                  <td className="px-4 py-2">{patient.dateNaissance}</td>
                  <td className="p-3 flex gap-2 justify-center flex-wrap">
                    <button
                      onClick={() => handleEditClick(patient)}
                      className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(patient)}
                      className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="p-3 text-center text-gray-500"
                >
                  Aucun patient trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Ajout */}
      {isModalOpen && (
         <AddPatient onClose={() => setIsModalOpen(false)} />
      )}

      {/* Modal Suppression */}
      {isDeleteModalOpen && (
       <DeletePatient onSucces={confirmDelete} onClose={() => setIsDeleteModalOpen(false)} />
      )}

      {/* Modal Modification */}
      {isEditModalOpen && (
        <EditPatient onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
}
