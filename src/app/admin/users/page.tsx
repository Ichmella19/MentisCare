"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface User {
  id: number;
  name: string;
  email: string;
  status: "Actif" | "Non actif";
  createdAt: string;
  avatar: string;
}

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Amine Diallo",
      email: "amine.diallo@gmail.com",
      status: "Actif",
      createdAt: "2025-08-17 16:19:27",
      avatar: "/images/user/user-04.jpg",
    },
    {
      id: 2,
      name: "Fatou Ndiaye",
      email: "fatou.ndiaye@gmail.com",
      status: "Actif",
      createdAt: "2025-08-17 16:19:26",
      avatar: "/images/user/user-03.jpg",
    },
    {
      id: 3,
      name: "Lucas Morel",
      email: "lucas.morel@gmail.com",
      status: "Actif",
      createdAt: "2025-08-16 14:12:45",
      avatar: "/images/user/user-08.jpg",
    },
    {
      id: 4,
      name: "Sophie Bernard",
      email: "sophie.bernard@gmail.com",
      status: "Actif",
      createdAt: "2025-08-15 10:22:19",
      avatar: "/images/user/user-09.jpg",
    },
  ]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="p-4 md:p-6 bg-white text-black dark:bg-black dark:text-white min-h-screen"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        Utilisateurs
      </h1>

      {/* Card */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold">Historiques des Utilisateurs</h2>
          <button
            className="px-4 py-2 bg-[#08A3DC] text-white rounded-md hover:bg-[#067aa6] w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Ajouter un Utilisateur
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
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 w-full sm:w-auto">
            Rechercher
          </button>
        </div>

        {/* Table for desktop/tablet */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="p-3">Nom Complet</th>
                <th className="p-3">Email</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-3 flex items-center gap-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="truncate max-w-[120px] md:max-w-none">
                        {user.name}
                      </span>
                    </td>
                    <td className="p-3 truncate max-w-[150px]">{user.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-white text-sm ${
                          user.status === "Actif"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3">{user.createdAt}</td>
                    <td className="p-3 text-center flex gap-2 justify-center flex-wrap">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
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
                    colSpan={5}
                    className="p-3 text-center text-gray-500"
                  >
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile view: cards */}
        <div className="block md:hidden space-y-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="p-3 border rounded-md shadow-sm flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-semibold truncate">
                    {user.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600 break-words">{user.email}</p>
                <span
                  className={`px-2 py-1 w-fit rounded text-white text-sm ${
                    user.status === "Actif" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {user.status}
                </span>
                <p className="text-xs text-gray-500">{user.createdAt}</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <button className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                    <FaEdit />
                  </button>
                  <button className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Aucun utilisateur trouvé
            </p>
          )}
        </div>
      </div>

      {/* MODAL AJOUT */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center p-4 z-50">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative z-10 mx-2 sm:mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Ajouter un Utilisateur</h2>
              <button onClick={() => setIsModalOpen(false)}>✖</button>
            </div>

            <Formik
              initialValues={{ name: "", email: "", role: "User" }}
              validationSchema={Yup.object({
                name: Yup.string().required("Nom obligatoire"),
                email: Yup.string()
                  .email("Email invalide")
                  .required("Email obligatoire"),
                role: Yup.string()
                  .oneOf(["Admin", "User"])
                  .required("Rôle obligatoire"),
              })}
              onSubmit={(values) => {
                console.log("Nouveau user :", values);
                setIsModalOpen(false);
              }}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block mb-1">Nom complet *</label>
                    <Field
                      name="name"
                      className="w-full p-2 border rounded"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500 text-sm">
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1">Email *</label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full p-2 border rounded"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1">Rôle *</label>
                    <Field
                      as="select"
                      name="role"
                      className="w-full p-2 border rounded"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </Field>
                  </div>

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

      {/* MODAL SUPPRESSION */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center p-4 z-50">
           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative z-10 mx-2 sm:mx-4">
            <h3 className="text-lg font-bold mb-4 text-red-600">
              Voulez-vous vraiment supprimer cet utilisateur ?
            </h3>
            <p className="mb-6 text-black dark:text-white">
              Cliquer sur <span className="font-semibold">Valider</span> pour
              effectuer votre action.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-4">
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

      {/* MODAL MODIFICATION */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center p-4 z-5">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative z-10 mx-2 sm:mx-4">
            <h3 className="text-lg font-bold mb-4">Modifier les informations de l'utilisateur </h3>
              <button onClick={() => setIsEditModalOpen(false)}>✖</button>
            <Formik
              initialValues={{ name: "", email: "", role: "User" }}
              validationSchema={Yup.object({
                name: Yup.string().required("Nom obligatoire"),
                email: Yup.string()
                  .email("Email invalide")
                  .required("Email obligatoire"),
                statuts: Yup.string()
                  .oneOf(["Actif", "Non actif"])
                  .required("Statut obligatoire"),
              })}
              onSubmit={(values) => {
                console.log("Utilisateur modifié :", values);
                setIsEditModalOpen(false);
              }}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block mb-1">Nom</label>
                    <Field
                      type="text"
                      name="name"
                      className="w-full px-3 py-2 border rounded"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500 text-sm">
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 border rounded"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1">Statut</label>
                    <Field
                      as="select"
                      name="status"
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="Actif">Actif</option>
                      <option value="Inactif">Inactif</option>
                    </Field>
                  </div>

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
