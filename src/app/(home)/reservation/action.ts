"use server";

import { auth } from "@/auth";
import  prisma  from "@/lib/db";
const take = 16;

export async function listReservations(page: number, search:string) {
  try {
    // On va chercher les créneaux dans la table calendar
    const skip = (page - 1) * take;
    const calendars = await prisma.calendar.findMany({
      where:{
        OR:[
                {category:{
                  name:{contains:search.toLowerCase(), mode: 'insensitive'}}
                },
                 {user:{
                  name:{contains:search.toLowerCase(), mode: 'insensitive'},
                  email:{contains:search.toLowerCase(), mode: 'insensitive'},
                }
                },
            ]
      },
      include: { category: true, user:true },
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

export async function makeReservation(
  calendarId: number,
  nom: string,
  email: string,
  phone: string,
  description: string,
  adresse: string
) {
  try {
    // Vérifier que le créneau existe et est disponible
    const calendar = await prisma.calendar.findUnique({
      where: { id: calendarId },
    });

    if (!calendar) {
      return { success: false, message: "Créneau non trouvé." };
    }

    if (calendar.quantity == calendar.stock){
      return { success: false, message: "PLus de place disponible" };
    }

    // Créer la réservation
    const reservation = await prisma.reservation.create({
      data: {
        calendarId,
        nom,
        email,
        phone,
        description,
        adresse,
      },
    });

    // Marquer le créneau comme réservé
    await prisma.calendar.update({
      where: { id: calendarId },
      data: { stock: calendar.stock+1 },
    });

    return { success: true, data: reservation };
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message || "Erreur lors de la réservation." };
    }
    return { success: false, message: "Erreur lors de la réservation." };
  }
}
export async function listReservationsByCalendar(calendarId: number) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { calendarId },
      // pas besoin d'include user ou category ici
      orderBy: { createdAt: "desc" }, // optionnel pour trier les plus récentes
    });

    return { success: true, data: reservations };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Erreur lors de la récupération des réservations." };
  }
}
