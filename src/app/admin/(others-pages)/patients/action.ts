"use server";

import prisma from "@/lib/db";
import { genererMatriculeUnique } from "@/lib/zod";
import { ca } from "zod/v4/locales";
 const take = 12

export async function listPatients(page:number, search:string) {
  const skip = (page - 1) * take;
    const patients = await prisma.patient.findMany({
      where:{
        OR:[
          {name: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {email: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {phone: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {adresse: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {sexe: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {dateNaissance: {contains:search.toLowerCase(), mode: 'insensitive'}},
          {pays: {contains:search.toLowerCase(), mode: 'insensitive'}},
        ]
      },
        orderBy: { createdAt: 'desc' },
        include: { user: true },
        take,
        skip
    });

    const totalUsers = await prisma.patient.count();
    const totalPages = Math.ceil(totalUsers / take);

//    
    return { success: true, data: {patients, totalPages} };
} 
export async function addPatient(
  name: string,
  email: string,
  phone: string,
  adresse: string,
  sexe: string,
  dateNaissance: string,
  pays: string,
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
// action.ts


export async function listDoctors() {
  try {
    const users = await prisma.user.findMany({
      where: { role: "USER" }, // ou "doctor" si tu as un rôle spécifique
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return { success: true, data: users };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function assignDoctorToPatient(patientId: number, doctorId: string) {
  try {
    // Vérifier si le patient existe
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });
    if (!patient) {
      return { success: false, message: "Patient non trouvé." };
    }
    // Vérifier si le médecin existe
    const doctor = await prisma.user.findUnique({
      where: { id: doctorId, role: "USER" }, // ou "doctor" si tu as un rôle spécifique
    });
    if (!doctor) {
      return { success: false, message: "Médecin non trouvé." };
    } 

    await prisma.patient.update({
      where: { id: patientId },
      data: { user: { connect: { id: doctorId } } },
    });
    return { success: true, message: "Médecin assigné au patient avec succès." };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }catch (error: any) {
    return { success: false, message: error.message || "Erreur lors de l'assignation du médecin au patient." };
  }
}
