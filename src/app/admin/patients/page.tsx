"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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

export default function GestionPatients() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean@mail.com",
      phone: "+22912345678",
      adresse: "Cotonou",
      sexe: "M",
      dateNaissance: "1995-03-12",
    },
    {
      id: 2,
      name: "Awa Koné",
      email: "awa.kone@mail.com",
      phone: "+22987654321",
      adresse: "Abidjan",
      sexe: "F",
      dateNaissance: "2000-07-05",
    },
    {
      id: 3,
      name: "Paul Martin",
      email: "paul.martin@mail.com",
      phone: "+22999887766",
      adresse: "Lomé",
      sexe: "M",
      dateNaissance: "1990-01-20",
    },
  ]);

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
        <div className="fixed inset-0 flex justify-center items-center p-2 sm:p-4 z-50">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg p-4 sm:p-6 relative z-10 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Ajouter un Patient</h2>
              <button onClick={() => setIsModalOpen(false)}>✖</button>
            </div>
            <Formik
              initialValues={{
                name: "",
                mail: "",
                phone: "",
                adresse: "",
                sexe: "",
                dateNaissance: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Nom obligatoire"),
                mail: Yup.string()
                  .email("Email invalide")
                  .required("Email obligatoire"),
                phone: Yup.string().required("Téléphone obligatoire"),
                adresse: Yup.string().required("Adresse obligatoire"),
                sexe: Yup.string().required("Sexe obligatoire"),
                dateNaissance: Yup.string().required(
                  "Date de naissance obligatoire"
                ),
              })}
              onSubmit={(values) => {
                console.log("Nouveau patient :", values);
                setIsModalOpen(false);
              }}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <Field
                    name="name"
                    placeholder="Nom complet"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}

                  <Field
                    name="mail"
                    type="email"
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.mail && touched.mail && (
                    <p className="text-red-500 text-sm">{errors.mail}</p>
                  )}

                  <Field
                    name="phone"
                    placeholder="Téléphone"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}

                  <Field
                    name="adresse"
                    placeholder="Adresse"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.adresse && touched.adresse && (
                    <p className="text-red-500 text-sm">{errors.adresse}</p>
                  )}

                  <Field
                    as="select"
                    name="sexe"
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Sexe</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </Field>
                  {errors.sexe && touched.sexe && (
                    <p className="text-red-500 text-sm">{errors.sexe}</p>
                  )}

                  <Field
                    type="date"
                    name="dateNaissance"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.dateNaissance && touched.dateNaissance && (
                    <p className="text-red-500 text-sm">
                      {errors.dateNaissance}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto"
                    >
                      Valider
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Modal Suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center p-2 sm:p-4 z-50">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg p-4 sm:p-6 relative z-10 overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold mb-4 text-red-600">
              Voulez-vous vraiment supprimer ce patient ?
            </h3>
            <p className="mb-6">
              Cliquer sur <span className="font-semibold">Valider</span> pour
              effectuer votre action.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 w-full sm:w-auto"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modification */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center p-2 sm:p-4 z-50">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          ></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg p-4 sm:p-6 relative z-10 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Modifier les informations du patient
              </h2>
              <button onClick={() => setIsEditModalOpen(false)}>✖</button>
            </div>
            <Formik
              initialValues={{
                name: selectedPatient?.name || "",
                mail: selectedPatient?.email || "",
                phone: selectedPatient?.phone || "",
                adresse: selectedPatient?.adresse || "",
                sexe: selectedPatient?.sexe || "",
                dateNaissance: selectedPatient?.dateNaissance || "",
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Nom obligatoire"),
                mail: Yup.string()
                  .email("Email invalide")
                  .required("Email obligatoire"),
                phone: Yup.string().required("Téléphone obligatoire"),
                adresse: Yup.string().required("Adresse obligatoire"),
                sexe: Yup.string().required("Sexe obligatoire"),
                dateNaissance: Yup.string().required(
                  "Date de naissance obligatoire"
                ),
              })}
              onSubmit={(values) => {
                console.log("Patient modifié :", values);
                setIsEditModalOpen(false);
              }}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <Field
                    name="name"
                    placeholder="Nom complet"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}

                  <Field
                    name="mail"
                    type="email"
                    placeholder="Email"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.mail && touched.mail && (
                    <p className="text-red-500 text-sm">{errors.mail}</p>
                  )}

                  <Field
                    name="phone"
                    placeholder="Téléphone"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}

                  <Field
                    name="adresse"
                    placeholder="Adresse"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.adresse && touched.adresse && (
                    <p className="text-red-500 text-sm">{errors.adresse}</p>
                  )}

                  <Field
                    as="select"
                    name="sexe"
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="">Sexe</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </Field>
                  {errors.sexe && touched.sexe && (
                    <p className="text-red-500 text-sm">{errors.sexe}</p>
                  )}

                  <Field
                    type="date"
                    name="dateNaissance"
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.dateNaissance && touched.dateNaissance && (
                    <p className="text-red-500 text-sm">
                      {errors.dateNaissance}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full sm:w-auto"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto"
                    >
                      Valider
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}
