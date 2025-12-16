"use client";

import { Suspense } from "react";
import TablePatient from "@/components/patient/TablePatient";

export default function PatientsClient() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <TablePatient />
    </Suspense>
  );
}
