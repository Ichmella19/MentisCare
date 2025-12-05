"use server";
import prisma from "@/lib/db";
import { auth } from "@/auth"

import { startOfMonth, subMonths, endOfMonth } from "date-fns";

export async function statsInfoAdmin() {
    const session = await auth(); 
  const patients = await prisma.patient.count({});

  const reservation = await getTotalReservationsForUser()

  const users = await prisma.user.count({
    where:{
      role: 'USER'
    }
  })

  const admins = await prisma.user.count({
    where:{
      role: 'ADMIN'
    }
  })

  const data = {patients, reservation, users, admins}

  return { success: true, data };
}

export async function statGraphAdmin() {

    const session = await auth()
    const userId = session?.user?.id
  try {
    const now = new Date();
    const startDate = startOfMonth(subMonths(now, 11));
    const endDate = endOfMonth(now);

    // Récupérer les réservations pour cet utilisateur via la relation Calendar
    const reservations = await prisma.reservation.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Initialiser tous les 12 mois avec 0
    const monthlyStats: Record<string, number> = {};
    for (let i = 11; i >= 0; i--) {
      const month = subMonths(now, i);
      const key = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;
      monthlyStats[key] = 0;
    }

    // Compter les réservations pour chaque mois
    reservations.forEach((reservation) => {
      const date = new Date(reservation.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (monthlyStats[key] !== undefined) {
        monthlyStats[key]++;
      }
    });

    // Convertir en tableau
    const result = Object.entries(monthlyStats).map(([month, count]) => ({
      month,
      count,
      label: new Date(month + '-01').toLocaleDateString('fr-FR', { 
        month: 'long', 
        year: 'numeric' 
      }),
    }));

    return {
      success: true,
      monthlyData: result,
      total: reservations.length,
    };
  } catch (error) {
    console.error("Erreur:", error);
    return {
      success: false,
      message: "Erreur lors de la récupération des statistiques",
    };
  }
}

export async function getTotalReservationsForUser() {
  const today = new Date();
  
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); 
  lastDayOfMonth.setHours(23, 59, 59, 999); // S'assurer d'inclure la fin du jour

  try {
    const reservationCount = await prisma.reservation.count({
      where: {
        createdAt: {
          gte: firstDayOfMonth, // Greater Than or Equal (>= Début du mois)
          lte: lastDayOfMonth, // Less Than or Equal (<= Fin du mois)
        },
      },
    });

    return reservationCount;

  } catch (error) {
    console.error("Erreur lors du calcul des réservations :", error);
    throw new Error("Impossible de récupérer le compte des réservations.");
  }
}

export async function getSexPatient(){

  const men = await prisma.patient.count({
    where:{
      sexe:"M"
    }
  })
  const women = await prisma.patient.count({
    where:{
      sexe:"F"
    }
  })
  const data = {men, women}

  return { success: true, data };
}

export async function getReservLast() {
    const limit = 5
    
    const session = await auth()
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include:{
        calendar:{
          include:{
            user:true
          }
        }
      },
      take: limit,
    });

    return {
      success: true,
      data: reservations,
    };
  } catch (error) {
    console.error("Erreur:", error);
    return {
      success: false,
      message: "Erreur lors de la récupération des réservations",
      data: [],
    };
  }
}

export async function getPatientLast() {
    const limit = 5
    
    const session = await auth()
  try {
     const patients = await prisma.patient.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    return {
      success: true,
      data: patients,
    };
  } catch (error) {
    console.error("Erreur:", error);
    return {
      success: false,
      message: "Erreur lors de la récupération des réservations",
      data: [],
    };
  }
}
