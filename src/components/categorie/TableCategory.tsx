"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { listCategories} from "@/app/admin/(others-pages)/categories/action";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { deleteCategory } from "@/app/admin/(others-pages)/categories/action";
 import AddCategory from "@/components/categorie/AddCategory";
 import DeleteCategory from "@/components/categorie/DeleteCategory";
 import EditCategory from "@/components/categorie/EditCategory";

// Définition du type Patient
type Category = {
  id: number;
    name: string;

    createdAt: string;
};

export default function TableCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); 
  useEffect(() => {
    async function loadPatients() {
      try {
        const result = await listCategories();

        if (result.success && result.data) {
          setCategories(
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
            result.data.map((p: any) => ({
                id: p.id,
                name: p.name ?? "",
                createdAt: p.createdAt ?? "",

            }))
          );
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des patients :", error);
        setCategories([]);
      }
    }

    loadPatients();
  }, [search]);

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
      // Supprime l'utilisateur du state
      setCategories((prevCategories) => prevCategories.filter((u) => u.id !== selectedCategory.id));
      toast.success(result.message);
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
      // router.refresh(); // Actualiser la page pour refléter les changements
      router.push('/admin/categories');
    } else {
      toast.error(result.message || "Erreur lors de la suppression.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Erreur serveur");
  }
};

  const filteredCategories = categories.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) 
  
  );

  return (
    <div
      className="p-4 md:p-6 bg-white text-black dark:bg-black dark:text-white min-h-screen"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
    Catégories de maladies
      </h1>
     <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          
          <button
            className="px-4 py-2 bg-[#08A3DC] text-white rounded-md hover:bg-[#067aa6] w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Ajouter une categorie
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
            <tr >
              <th className="px-4 py-2 text-left">Nom de la catégorie</th>
                <th className="px-4 py-2 text-left">Date de  création</th>
                 <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2">{category.name}</td>
                 <td>{new Date(category.createdAt).toLocaleString()}</td>


                
                  <td className="p-3 text-center flex gap-2 justify-center ">
                   
                    <button
                      onClick={() => handleEditClick(category)}
                      className="border-[#08A3DC] rounded-[5px] p-1 border-1 bg-gray-200 dark:bg-transparent hover:bg-[#08A3DC] dark:hover:bg-[#08A3DC] hover:text-white transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(category)}
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
      </div>
      {/* Modal Ajout */}
      {isModalOpen && <AddCategory onClose={() => setIsModalOpen(false)} />}

      {/* Modal Suppression */}
      {isDeleteModalOpen && selectedCategory&& (
        <DeleteCategory
          onClose={() => setIsDeleteModalOpen(false)} 
          onSucces={confirmDelete} 
        />
      )}
      

      {/* Modal Modification */}
      {isEditModalOpen &&  selectedCategory &&(
        <EditCategory 
        category={selectedCategory}
    onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
}
