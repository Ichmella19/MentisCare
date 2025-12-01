"use client";

export default function DoctorStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
        <p className="text-gray-500 text-sm">Mes Patients</p>
        <h2 className="text-3xl font-semibold">18</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
        <p className="text-gray-500 text-sm">Consultations ce mois</p>
        <h2 className="text-3xl font-semibold">42</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
        <p className="text-gray-500 text-sm">Patients en attente</p>
        <h2 className="text-3xl font-semibold">5</h2>
      </div>

    </div>
  );
}
