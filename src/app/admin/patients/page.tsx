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
      id: 2,
      name: "Jean Dupont",
      email: "jean@mail.com",
      phone: "+22912345678",
      adresse: "Cotonou",
      sexe: "M",
     
      dateNaissance: "1995-03-12",
    },
    {
      id: 4,
      name: "Awa Koné",
      email: "awa.kone@mail.com",
      phone: "+22987654321",
      adresse: "Abidjan",
      sexe: "F",
    
      dateNaissance: "2000-07-05",
    },
     
  ]);

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Validation Yup


  return (
    <div
      className="p-4 md:p-6 bg-white text-black dark:bg-black dark:text-white min-h-screen"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Gestion des Patients</h1>
        <button
          className="px-4 py-2 bg-[#08A3DC] text-white rounded-md hover:bg-[#067aa6]"
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
        <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
          Rechercher
        </button>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200  shadow rounded-lg">
          <thead className="">
            <tr>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Téléphone</th>
              <th className="px-4 py-2">Adresse</th>
              <th className="px-4 py-2">Sexe</th>
              <th className="px-4 py-2">Date de naissance</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-t text-center">
                  <td className="px-4 py-2">{patient.name}</td>
                  <td className="px-4 py-2">{patient.email}</td>
                  <td className="px-4 py-2">{patient.phone}</td>
                  <td className="px-4 py-2">{patient.adresse}</td>
                  <td className="px-4 py-2">{patient.sexe}</td>
               
                  <td className="px-4 py-2">{patient.dateNaissance}</td>
                  <td className="p-3 text-center flex gap-2 justify-center">
                    <button className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                      <FaEdit />
                    </button>
                    <button
                     
                      className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-3 text-center text-gray-500">
                  Aucun patient trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        
        <div className="fixed flex justify-center items-center p-4 z-50 ">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 flex justify-center items-center p-4 z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 justify-center items-center">
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
                        email: Yup.string().email("Email invalide").required("Email obligatoire"),
                        role: Yup.string().oneOf(["Admin", "User"]).required("Rôle obligatoire"),
                      })}
                      onSubmit={(values) => {
                        console.log("Nouveau user :", values);
                        setIsModalOpen(false);
                      }}>
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

                  <div className="flex justify-end gap-2">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Annuler
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Valider
              </button>
            </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
         </div>
      )}
    </div>
   
      
  );
}
