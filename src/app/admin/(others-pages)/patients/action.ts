"use server";

import prisma from "@/lib/db";
import { genererMatriculeUnique } from "@/lib/zod";


export async function listPatients() {
    const patients = await prisma.patient.findMany({
        orderBy: { createdAt: 'desc' },
    });
//     const formatted = patients.map((p) => ({
//     ...p,
//     createdAt: p.createdAt.toISOString(), // string ISO
//   }));
    return { success: true, data: patients};
} 
export async function addPatient(
  name: string,
  email: string,
  phone: string,
  adresse: string,
  sexe: string,
  dateNaissance: string,
  pays: string,
  
  userId: string
) {
  try {
      const matricule = genererMatriculeUnique();
    await prisma.patient.create({
      data: {
        name,
        email,
        phone,
        adresse,
        sexe,
        dateNaissance,
        pays,
        matricule,
        userId,
      },
    });

    return { success: true, message: "Patient ajouté avec succès." };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message || "Erreur lors de l'ajout du patient." };
  }
}
export async function deletePatient(id: number) {
    const patient = await prisma.patient.findUnique({
        where: { id },
    });
    if (!patient) {
        return { success: false, message: "Patient non trouvé." };
    }
    await prisma.patient.delete({
        where: { id },
    });
    return { success: true, message: "Patient supprimé avec succès." };
}
export async function editPatient(
  id: number,
  name: string,
    email: string,
    phone: string,
    adresse: string,
    sexe: string,
    dateNaissance: string,
    pays: string,
    matricule: string
) {
    const patient = await prisma.patient.findUnique({
        where: { id },
    });
    if (!patient) {
        return { success: false, message: "Patient non trouvé." };
    }
    await prisma.patient.update({
        where: { id },
        data: {
        name,
        email,
        phone,
        adresse,
        sexe,
        dateNaissance,
        pays,
        matricule,
        },
    });
    return { success: true, message: "Patient mis à jour avec succès." };
}

