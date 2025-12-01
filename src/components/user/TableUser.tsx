"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
// import {Eye} from "lucide-react"
import { useState, useEffect } from "react";
import { listUsers } from "@/app/admin/(others-pages)/users/action";
import { deleteUser } from "@/app/admin/(others-pages)/users/action";
import User from "@/assets/images/user.webp";
import Image from "next/image";
import { toast } from "react-toastify";

// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import AddUser from "@/components/user/AddUser";
import EditUser from "@/components/user/EditUser";
import DeleteUser from "@/components/user/DeleteUser";
import { useRouter, useSearchParams } from "next/navigation";
import { Paginate } from "../Paginate";

// import { SheetDemo } from "./Test";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  statut: boolean;
  createdAt: Date;
  image: string;
}

export default function TableUser() {
 
    const router = useRouter();
    const searchParam = useSearchParams();
    const page = parseInt(searchParam?.get("page") || "1");
    const param = searchParam?.get("search") ?? "";
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [totalPages, setTotalPages] = useState(1); // Pour la pagination
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

 useEffect(() => {
    async function loadUsers() {

      const result = await listUsers(page,search); // Charger la première page
      if (result.success) {
        setUsers(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          result.data.users.map((u: any) => ({
            id: u.id,
            name: u.name ?? "",
            email: u.email,
            role: u.role,
            statut: u.statut,
            createdAt: new Date(u.createdAt),
            image: u.image ?? "",
          }))
        );
        setTotalPages(result.data.totalPages);
      }
    }
    loadUsers();
  }, [search]);
  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const confirmDelete = async () => {
  if (!selectedUser) return;

  try {
    const result = await deleteUser(selectedUser.id); 

    if (result.success) {
      // Supprime l'utilisateur du state
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== selectedUser.id));
      toast.success(result.message);
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      // router.refresh(); // Actualiser la page pour refléter les changements
      router.push('/admin/users');
    } else {
      toast.error(result.message || "Erreur lors de la suppression.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Erreur serveur");
  }
};

  // const filteredUsers = users.filter(
  //   (u) =>
  //     u.name.toLowerCase().includes(search.toLowerCase()) ||
  //     u.email.toLowerCase().includes(search.toLowerCase())
  // );

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
        </div>

        {/* Table for desktop/tablet */}
 <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
       {loading ? (
  <div className="flex flex-col items-center justify-center py-10">
    <div className="w-10 h-10 border-4 border-[#d61353]/30 border-t-[#d61353] rounded-full animate-spin"></div>
    <p className="mt-3 text-gray-600 dark:text-gray-300 font-medium">
      Chargement des utilisateurs...
    </p>
  </div>
)  : error ? (

          <div className="text-center text-red-500 py-8">{error}</div>
        ) :users.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Aucun utilisateur  trouvé</div>
        ) : (          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="p-3">Nom Complet</th>
                <th className="p-3">Email</th>
                <th  className="p-3">Role</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="p-3 flex items-center gap-2">
                      <Image
                       src={User}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="truncate max-w-[120px] md:max-w-none">
                        {user.name}
                      </span>
                    </td>
                    <td className="p-3 truncate max-w-[150px]">{user.email}</td>
                    <td className="p-3">{user.role === "ADMIN" ? "Admin" : "User"}</td>
                   <td className="p-3">
  <button
    onClick={() => {
      // Ici tu peux mettre ta logique de changement de statut (API, state, etc.)
      console.log("Toggle statut", user.id);
    }}
    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
      user.statut ? "bg-green-300" : "bg-red-300"
    }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
        user.statut ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
</td>

                   <td className="p-3">
  {new Date(user.createdAt).toLocaleDateString()}
</td>

                    <td className="p-3 text-center flex gap-2 justify-center flex-wrap">
                      {/* <button className=" border-[#08A3DC] rounded-[5px] dark:hover:bg-[#08A3DC] bg-gray-200 dark:bg-transparent border-1  hover:bg-[#08A3DC] hover:text-white transition">
                        <Eye />
                      </button>  */}
                      <button
                        onClick={() => handleEditClick(user)}
                        className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC]  hover:text-white transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        </div>
        { totalPages === 1 ? ''
        :<Paginate pages ={totalPages} currentPage={page} path="/admin/users" param={param} />
        }
        {/* Mobile view: cards */}
        <div className="block md:hidden space-y-3">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="p-3 border rounded-md shadow-sm flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={User}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-semibold truncate">{user.name}</span>
                </div>
                <p className="text-sm text-gray-600 break-words">{user.email}</p>
                <span
                  className={`px-2 py-1 w-fit rounded text-white text-sm `}
                >
                  {user.statut}
                </span>
                <p className="text-xs text-gray-500">{user.createdAt.toLocaleDateString()}</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                  >
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

      {/* ----------------- MODALS ----------------- */}
      {/** Tous les modals sont adaptatifs avec max-w et scroll si besoin */}

      {/* Modal Ajout */}
      {isModalOpen && (
        <AddUser onClose={() => setIsModalOpen(false)} />
      )}

      {/* Modal Suppression */}
    {isDeleteModalOpen && selectedUser && (
  <DeleteUser 
    onClose={() => setIsDeleteModalOpen(false)} 
    onSucces={confirmDelete} 
  />
)}

      {/* Modal Modification */}
     {isEditModalOpen && selectedUser && (
  <EditUser
    user={selectedUser}
    onClose={() => setIsEditModalOpen(false)}
  />
)}

    </div>
  );
}

