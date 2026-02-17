import { Suspense } from "react";
import TableConsultation from "@/components/consultation/TableConsultation";

export default function ConsultationsPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <TableConsultation />
    </Suspense>
  );
}
