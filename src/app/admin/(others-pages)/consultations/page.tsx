import TableConsultation from "@/components/consultation/TableConsultation";
import { listConsultations } from "./action"; // chemin vers ton action.ts

export default async function ConsultationsPage() {
  // Appel côté serveur
  const res = await listConsultations();
  const consultations = await res.json(); // JSON côté serveur

  return <TableConsultation consultations={consultations} />;
}
