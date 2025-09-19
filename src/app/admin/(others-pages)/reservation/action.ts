// action.ts
"use server";
import prisma from "@/lib/db";

export async function listReservations() {
  try {
    const calendars = await prisma.calendar.findMany({
      include: { category: true },
      orderBy: { date: "asc" },
    });

    console.log("Calendars trouvés:", calendars);

    return calendars.map((c) => ({
      id: c.id,
      category: c.category,
      quantity: c.quantity,
      stock: c.quantity,
      date: c.date,
      heureDebut: c.heureDebut,
      heureFin: c.heureFin,
      createdAt: c.createdAt,
    }));
  } catch (err) {
    console.error("Erreur listReservations:", err);
    return [];
  }
}
