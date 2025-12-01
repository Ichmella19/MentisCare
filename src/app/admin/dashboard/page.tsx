import type { Metadata } from "next";
import React from "react";

// ==== Import de tes composants (tu vas les créer ensuite) ====
import StatsCards from "@/components/dashboard/StatsCards";
import ConsultationsChart from "@/components/dashboard/ConsultationsCharts";
 import DiagnosticPie from "@/components/dashboard/DiagnosticPie";
 import GenderPie from "@/components/dashboard/GenderPie";
 import TreatmentStatusBar from "@/components/dashboard/TreatmentsStatusBar";
 import RecentPatients from "@/components/dashboard/RecentPatients"
 import RecentConsultations from "@/components/dashboard/RecentConsultations";
 import RiskAlerts from "@/components/dashboard/RiskAlerts";

export const metadata: Metadata = {
  title: "Dashboard - Centre Saint Camille de Tokan",
  description:
    "Tableau de bord de suivi des patients atteints de détresse mentale",
};

export default function Dashboard() {
  return (
    <div
      className="grid grid-cols-12 gap-4 md:gap-6 bg-white text-black dark:bg-black dark:text-white"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* ====== CARDS STATISTIQUES ====== */}
      <div className="col-span-12">
        <StatsCards />
      </div>

      {/* ====== GRAPHIQUE : CONSULTATIONS PAR MOIS ====== */}
      <div className="col-span-12 xl:col-span-8">
        <ConsultationsChart />
      </div>

      <div className="col-span-12 xl:col-span-4 space-y-6">
        {/* ====== DIAGNOSTICS (Camembert) ====== */}
        <DiagnosticPie />

        {/* ====== RÉPARTITION PAR SEXE ====== */}
        <GenderPie />
      </div>

      {/* ====== STATUT DES TRAITEMENTS ====== */}
      <div className="col-span-12">
        <TreatmentStatusBar />
      </div>

      {/* ====== ALERTES : Patients à Risque ====== */}
      <div className="col-span-12 xl:col-span-4">
        <RiskAlerts />
      </div>

      {/* ====== RÉCENT : Patients ====== */}
      <div className="col-span-12 xl:col-span-4">
        <RecentPatients />
      </div>

      {/* ====== RÉCENT : Consultations ====== */}
      <div className="col-span-12 xl:col-span-4">
        <RecentConsultations />
      </div>
    </div>
  );
}
