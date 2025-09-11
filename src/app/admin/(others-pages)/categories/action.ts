"use server";
import  prisma  from "@/lib/db";
import { toSlug } from "@/lib/zod";
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addCategory(name: string) {
  try {
    await prisma.category.create({
      data: {
        name,
        identifiantUrl: toSlug(name),
      },
    });
    return { success: true, message: "Catégorie ajoutée avec succès." };
  } catch (error: unknown) {
    if (error instanceof Error) {
            return { success: false, message: error.message || "Erreur lors du chargement des catégories." };
        }
        return { success: false, message: "Erreur lors du chargement des catégories." };
  }
}


export async function listCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { id: 'desc' },
        });
        return { success: true, data: categories };
    } 
   

    catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, message: error.message || "Erreur lors du chargement des catégories." };
        }
        return { success: false, message: "Erreur lors du chargement des catégories." };
    }
}

export async function deleteCategory(id: number) {
    const category = await prisma.category.findUnique({
        where: { id },
    });
    if (!category) {
        return { success: false, message: "Catégorie non trouvée." };
    }
    await prisma.category.delete({
        where: { id },
    });
    return { success: true, message: "Catégorie supprimée avec succès." };
}
export async function editCategory(id: number, name: string) {
    const category = await prisma.category.findUnique({
        where: { id },
    });
    if (!category) {
        return { success: false, message: "Catégorie non trouvée." };
    }
    await prisma.category.update({
        where: { id },
        data: { name, identifiantUrl: toSlug(name) },
    });
    return { success: true, message: "Catégorie mise à jour avec succès." };
}