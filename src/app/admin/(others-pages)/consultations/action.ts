"use server";
import  prisma  from "@/lib/db";
import { NextResponse } from "next/server";


export async function listConsultations() {
  try {
    // On va chercher les créneaux dans la table calendar
    const calendars = await prisma.calendar.findMany({
      include: { category: true },
      orderBy: { date: "desc" },
    });

    const consultations = calendars.map((c) => {
      // Stock = nombre de places max - réservations (à adapter si tu gères une table reservations)
      const stock = c.quantity - (c.reserved ?? 0);

      return {
        id: c.id,
        categorie: c.category?.name ?? "Inconnu",
        quantite: c.quantity,
        stock,
        createdAt: c.date,
      };
    });

    return NextResponse.json(consultations);
  } catch (error) {
    console.error("Erreur API consultations:", error);
    return NextResponse.json({ error: "Erreur lors du fetch" }, { status: 500 });
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


