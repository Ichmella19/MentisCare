"use server";

import prisma from "@/lib/db";
import { connect } from "http2";
import { ca } from "zod/v4/locales";

export async function listCalendars(startDate?: string, endDate?: string) {
  try {
    const whereCondition: { date?: any } = {};

    // Gérer le cas où startDate et endDate sont définis
    if (startDate && endDate) {
      whereCondition.date = {
        gte: new Date(startDate), // 'gte' pour "greater than or equal to"
        lte: new Date(endDate),   // 'lte' pour "less than or equal to"
      };
    } else if (startDate) {
      // Gérer le cas où seul startDate est défini
      whereCondition.date = {
        gte: new Date(startDate),
      };
    } else if (endDate) {
      // Gérer le cas où seul endDate est défini
      whereCondition.date = {
        lte: new Date(endDate),
      };
    }

    const calendars = await prisma.calendar.findMany({
      where: whereCondition,
      include: { category: true },
      orderBy: { date: 'desc' },
    });

    return { success: true, data: calendars };
  } catch (error: any) {
    // Il est toujours bon de gérer les erreurs
    console.error("Erreur lors de la récupération des calendriers:", error);
    return { success: false, data: null, message: error.message };
  }
}

export async function addCalendar(
  categoryId: number,
  date: string,
  heureDebut: string,
  heureFin: string,
  quantity: number,
  userId: string
){
  try {
    console.log(categoryId,date,heureDebut,userId)
    const calendar = await prisma.calendar.create({
      data: {
        category:{connect:{id: categoryId}},
        date: new Date(date),
        heureDebut: heureDebut,
        heureFin: heureFin,
        quantity,
        user: {connect:{id:userId}},
        stock: 0,
      },
      include:{
        category:true
      }

    });
    return { success: true, message: "Emploie du temps ajouté avec succès." , data:calendar};
  } catch (error: any) {
    return { success: false, message: error.message || "Erreur lors de l'ajout du patient." };
  }
}

export async function editCalendar(
  id: number,
  categoryId: number,
    date: string,
    heureDebut: string,
    heureFin: string,
    quantity: number,
) {
    try{
        const calendar = await prisma.calendar.findUnique({ 
            where: { id },
        });
        if (!calendar) {
            return { success: false, message: "Patient non trouvé." };
        }   
        await prisma.calendar.update({
            where: { id },
            data: {
            category:{connect:{id: categoryId}},
            date: new Date(date),
            heureDebut: heureDebut,
            heureFin: heureFin,
            quantity,
            stock:calendar.stock,      
        },
        
        
        });
        const updatacalendar = await prisma.calendar.findUnique({ 
            where: { id },
            include:{
              category:true
            }
        });
        
        return { success: true, message: "Emploie du temps modifié avec succès." , data:updatacalendar};
    }catch (error: any) {
        return { success: false, message: error.message || "Erreur lors de la modification du rendez-vous." };
    }
}   
