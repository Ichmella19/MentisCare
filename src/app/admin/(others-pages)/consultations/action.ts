"use server";
import  prisma  from "@/lib/db";
export async function listConsultations() {
    const calendars = await prisma.calendar.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return { success: true, data: calendars};
} 


