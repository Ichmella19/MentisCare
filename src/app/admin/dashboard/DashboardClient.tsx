"use client";

import React from "react";

import StatsCards from "@/components/dashboard/StatsCards";
import ConsultationsChart from "@/components/dashboard/ConsultationsCharts";
import GenderPie from "@/components/dashboard/GenderPie";
import RecentPatients from "@/components/dashboard/RecentPatients";
import RecentConsultations from "@/components/dashboard/RecentConsultations";

export default function DashboardClient() {
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
        <GenderPie />
      </div>

      {/* ====== STATUT DES TRAITEMENTS ====== */}
      <div className="col-span-12">
        {/* <TreatmentStatusBar /> */}
      </div>

      {/* ====== RÉCENT : Patients ====== */}
      <div className="col-span-12 xl:col-span-6">
        <RecentPatients />
      </div>

      {/* ====== RÉCENT : Consultations ====== */}
      <div className="col-span-12 xl:col-span-6">
        <RecentConsultations />
      </div>
    </div>
  );
}
