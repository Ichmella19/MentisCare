"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import fs from "fs";
import path from "path";

type CreateSuiviProps = {
  patientId: number;
  description: string;
  prescription: string;
  fichier: File;
};
export async function listSuivisByPatient(patientId: number) {
  try {
    const suivis = await prisma.suivi.findMany({
      where: { patientId: patientId }, 
      include: {
        patient: true,
        user: true
      },
      orderBy: { createdAt: "desc" }
    });

    return { success: true, data: suivis };
  } catch (error) {
    console.error("Erreur listSuivisByPatient:", error);
    return { success: false, data: [] };
  }
}
export async function deleteSuivi(suiviId: number) {
  try {
    await prisma.suivi.delete({
      where: { id: suiviId },
    });
    return { success: true, message: "Suivi supprimé avec succès." };
  } catch (error) {
    console.error("Erreur deleteSuivi:", error);
    return { success: false, message: "Erreur lors de la suppression du suivi." };
  }
}
export async function createSuivi({ patientId, description, prescription, fichier }: CreateSuiviProps) {
  try {
    // Enregistrer le fichier sur le serveur (ex: /public/uploads)
    console.log("Fichier reçu:", patientId, description, prescription, fichier);
    const session = await auth()
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fichier.name);
    const buffer = Buffer.from(await fichier.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Créer le suivi dans la BDD
    const newSuivi = await prisma.suivi.create({
      data: {
        description,
        prescription,
        fichier: `/uploads/${fichier.name}`,
        patient: { connect: { id: patientId } },
        user: { connect: { id: session?.user?.id } }, // ID du médecin (à adapter)
      },
    });

    return { success: true, data: newSuivi };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: error.message || "Erreur lors de l'ajout du suivi" };
  }
}



