export default function StatsCards() {
  const stats = [
    { label: "Total Patients", value: 482 },
    { label: "Nouveaux ce mois", value: 32 },
    { label: "Consultations réalisées", value: 1294 },
    { label: "Rendez-vous à venir", value: 12 },
    { label: "Utilisateurs actifs", value: 8 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className="p-5 bg-white text-black dark:bg-black dark:text-white shadow rounded-xl border text-center"
        >
          <p className=" text-sm">{s.label}</p>
          <p className="text-2xl font-bold mt-1">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
