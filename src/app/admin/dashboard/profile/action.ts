"use server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { auth } from "@/auth"

export async function updateProfile(
  currentEmail: string, 
  newData: { name?: string; email?: string }
) {
  // Vérifier si l'utilisateur existe
  const user = await prisma.user.findUnique({
    where: { email: currentEmail },
  });

  if (!user) {
    return { success: false, error: "Utilisateur non trouvé" };
  }

  // Mettre à jour uniquement les champs modifiés
  const updatedUser = await prisma.user.update({
    where: { email: currentEmail },
    data: {
      name: newData.name ?? user.name,   // si name fourni -> update, sinon garder ancien
      email: newData.email ?? user.email, // si email fourni -> update, sinon garder ancien
    },
  });

  return { success: true, user: updatedUser };
}
// export async function updatePassword(oldPassword: string , newPassword: string){
//     const session = await auth()

//     const user = await prisma.user.findUnique({
//         where: { id: session?.user?.id }, 
//     });

//     if(user && await bcrypt.compare(oldPassword, user.password!)){
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         await prisma.user.update({
//             where: { id: session?.user?.id },
//             data: { password: hashedPassword },
//         });
//     }else{
//         return { success: false, error: "Ancien Mot de passe incorrect" };
//     }
//     return { success: true, message: "Mot de passe mis à jour avec succès" };
// }
// action.ts (avec débogage)
export async function updatePassword(oldPassword: string, newPassword: string) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { success: false, error: "Utilisateur non authentifié" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }, 
    });

    if (!user) {
      return { success: false, error: "Utilisateur non trouvé" };
    }

    if (!user.password) {
      return { success: false, error: "Aucun mot de passe défini pour cet utilisateur" };
    }

    // DEBUG: Afficher les informations de hachage
    console.log("Ancien mot de passe fourni:", oldPassword);
    console.log("Mot de passe haché en base:", user.password);
    console.log("Longueur du hash:", user.password.length);
    
    // Vérification de l'ancien mot de passe
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    console.log("Résultat de la comparaison:", isPasswordValid);
    
    if (!isPasswordValid) {
      return { success: false, error: "Ancien mot de passe incorrect" };
    }

    // Hachage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Mise à jour dans la base de données
    await prisma.user.update({
      where: { email: session.user.email },
      data: { password: hashedPassword },
    });

    return { success: true, message: "Mot de passe mis à jour avec succès" };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe:", error);
    return { success: false, error: "Erreur serveur lors de la mise à jour" };
  }
}