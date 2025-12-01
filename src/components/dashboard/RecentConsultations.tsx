export default function RecentConsultations() {
  const list = [
    { patient: "Alice D.", medecin: "Dr. Bernard", date: "2025-01-28" },
    { patient: "Jean P.", medecin: "Dr. Sarah", date: "2025-01-27" },
    { patient: "Marie K.", medecin: "Dr. Yao", date: "2025-01-26" },
  ];

  return (
    <div className="bg-white text-black dark:bg-black dark:text-whitep-6 rounded-xl shadow border">
      <h3 className="text-lg font-semibold mb-4">Dernières Consultations</h3>

      <ul className="space-y-3">
        {list.map((c, i) => (
          <li key={i} className="p-3  border rounded-lg">
            <p className="font-medium">{c.patient}</p>
            <p className="text-sm text-gray-600">
              Par : {c.medecin} • {c.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
