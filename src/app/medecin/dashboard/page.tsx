import DoctorStatsCards from "@/components/medecin/DoctorStatsCards";
import DoctorPatientsChart from "@/components/medecin/DoctorPatientsChart";
import LastConsultations from "@/components/medecin/LastConsultations";
import DoctorProfileCard from "@/components/medecin/DoctorProfileCard";

export default function DoctorDashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Statistiques principales */}
      <div className="col-span-12">
        <DoctorStatsCards />
      </div>

      {/* Graphique */}
      <div className="col-span-12 lg:col-span-8">
        <DoctorPatientsChart />
      </div>

      {/* Profil médecin */}
      <div className="col-span-12 lg:col-span-4">
        <DoctorProfileCard />
      </div>

      {/* Liste des dernières consultations */}
      <div className="col-span-12">
        <LastConsultations />
      </div>

    </div>
  );
}
