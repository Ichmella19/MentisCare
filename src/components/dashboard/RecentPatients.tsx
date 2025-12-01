export default function RecentPatients() {
  const patients = [
    { name: "Alice D.", date: "2025-01-28" },
    { name: "Jean P.", date: "2025-01-27" },
    { name: "Marie K.", date: "2025-01-26" },
  ];

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-semibold mb-4">Derniers Patients</h3>

      <ul className="space-y-3">
        {patients.map((p, i) => (
          <li key={i} className="p-3 border rounded-lg">
            <p className="font-medium">{p.name}</p>
            <p className="text-sm text-gray-600">{p.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
