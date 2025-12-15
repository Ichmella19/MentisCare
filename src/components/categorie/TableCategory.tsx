"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { listCategories, deleteCategory } from "@/app/admin/(others-pages)/categories/action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import AddCategory from "@/components/categorie/AddCategory";
import DeleteCategory from "@/components/categorie/DeleteCategory";
import EditCategory from "@/components/categorie/EditCategory";


interface Category {
  id: number;
  name: string;
  createdAt: string;
}


export default function TableCategory() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Charger les catégories
  useEffect(() => {
    async function loadCategories() {
      setLoading(true);
      setError(null);

      try {
        const result = await listCategories();

        if (result.success && result.data) {
          setCategories(result.data);
        } else {
          setError(result.message || "Erreur lors du chargement des catégories");
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError("Erreur serveur lors du chargement");
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  // Actions
  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;

    try {
      const result = await deleteCategory(selectedCategory.id);

      if (result.success) {
        setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id));
        toast.success(result.message);
        setIsDeleteModalOpen(false);
        setSelectedCategory(null);
        router.refresh();
      } else {
        toast.error(result.message || "Erreur lors de la suppression.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="p-4 md:p-6 bg-white text-black dark:bg-black dark:text-white min-h-screen"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Catégories de maladies</h1>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <h2 className="text-lg font-semibold">Liste des catégories de maladies</h2>
          <button
            className="px-4 py-2 bg-[#08A3DC] text-white rounded-md hover:bg-[#067aa6] w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Ajouter une catégorie de maladie
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

        {/* Table / Loader */}
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-10 h-10 border-4 border-[#08A3DC]/30 border-t-[#08A3DC]rounded-full animate-spin"></div>
              <p className="mt-3 text-gray-600 dark:text-gray-300 font-medium">
                Chargement des catégories de maladies...
              </p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Aucune catégorie trouvée</div>
          ) : (
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="p-3">Nom</th>
                  <th className="p-3">Créée le</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-3">{category.name}</td>
                    <td className="p-3">{new Date(category.createdAt).toLocaleString()}</td>
                    <td className="p-3 text-center flex gap-2 justify-center flex-wrap">
                      <button
                        onClick={() => handleEditClick(category)}
                        className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                        aria-label="Modifier"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(category)}
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

        {/* Mobile view */}
        <div className="block md:hidden space-y-3 mt-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category.id} className="p-3 border rounded-md shadow-sm flex flex-col gap-2 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="font-semibold truncate">{category.name}</div>
                </div>
                <div className="text-xs text-gray-500">{new Date(category.createdAt).toLocaleString()}</div>
                <div className="flex flex-wrap gap-3 mt-2">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                    aria-label="Modifier"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(category)}
                    className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-red-500 dark:hover:bg-red-500 hover:text-white transition"
                    aria-label="Supprimer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Aucune catégorie trouvée</p>
          )}
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && <AddCategory onClose={() => setIsModalOpen(false)} />}

      {isDeleteModalOpen && selectedCategory && (
        <DeleteCategory onClose={() => setIsDeleteModalOpen(false)} onSucces={confirmDelete} />
      )}

      {isEditModalOpen && selectedCategory && (
        <EditCategory category={selectedCategory} onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
}
