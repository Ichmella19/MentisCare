"use server";

import { auth } from "@/auth";
import  prisma  from "@/lib/db";
const take = 10;

export async function listConsultations(page: number, search:string) {
  try {
    // On va chercher les créneaux dans la table calendar
    const session = await auth()
    const skip = (page - 1) * take;
    const calendars = await prisma.calendar.findMany({
      where:{
        userId: session?.user?.id,
        OR:[
                {category:{
                  name:{contains:search.toLowerCase(), mode: 'insensitive'}}
                
                },
            ]
      },
      include: { category: true },
      orderBy: { date: "desc" },
      
        take,
        skip,
    });

    
    const totalUsers = await prisma.calendar.count();
    const totalPages = Math.ceil(totalUsers / take);

    return { success: true, data: {calendars,totalPages} };
  } catch (error: unknown) {
    if (error instanceof Error) {
            return { success: false, message: error.message || "Erreur lors du chargement des catégories." };
        }
        return { success: false, message: "Erreur lors du chargement des catégories." };
  }
}

export async function deleteConsultation(id: number) {
  try {
    // Suppression du créneau dans la table calendar
    await prisma.calendar.delete({
      where: { id },
    });
    return { success: true, message: "Consultation supprimée avec succès." };
  } catch (error) {
    console.error("Erreur lors de la suppression de la consultation :", error);
    return { success: false, message: "Erreur lors de la suppression." };
  }
}
// Récupérer les réservations liées à une consultation
export async function listReservationsByConsultation(calendarId: number) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { calendarId: calendarId },
     // si tu veux aussi afficher l’utilisateur
      orderBy: { createdAt: "asc" },
    });
    return reservations;
  } catch (err) {
    console.error(err);
    return [];
  }
}



