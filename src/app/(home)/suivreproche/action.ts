"use server";

import  prisma  from "@/lib/db";

export async function suivi(matricule: string) {
    try {
        const patient = await prisma.patient.findUnique({
            where: { matricule },
            include: { Suivi: true },
        });
        if (!patient) {
            return { success: false, message: "Patient non trouvé." };
        }
        
        const lastSuivi = await prisma.suivi.findFirst({
            where: { patient: { matricule } },
            include: { user: true },
            orderBy: { createdAt: "desc" },
            take: 1,
        });
        return { success: true, data: { patient, lastSuivi } };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, message: error.message || "Erreur lors du chargement du patient." };
        }
        return { success: false, message: "Erreur lors du chargement du patient." };
    }   

}
