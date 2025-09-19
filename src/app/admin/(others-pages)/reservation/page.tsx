// src/app/(home)/reservation/page.tsx
import { listReservations } from "@/app/admin/(others-pages)/reservation/action";
import ReservationPage from "@/app/(home)/reservation/page";

export default async function Reservation() {
  // Appel côté serveur → récupère directement les objets JS, pas de NextResponse
  const reservations = await listReservations();

  console.log("Reservations côté serveur :", reservations);

  return <ReservationPage reservations={reservations} />;
}
