import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard - Centre Saint Camille de Tokan",
  description:
    "Tableau de bord de suivi des patients atteints de détresse mentale",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
