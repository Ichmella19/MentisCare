export default function RiskAlerts() {
  const alerts = [
    { name: "Patient A", type: "Crise sévère" },
    { name: "Patient B", type: "Suivi urgent" },
    { name: "Patient C", type: "Risque d’abandon" },
  ];

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white p-6 rounded-xl shadow border h-full">
      <h3 className="text-lg font-semibold mb-4">Alertes Patients à Risque</h3>

      <ul className="space-y-3">
        {alerts.map((a, i) => (
          <li
            key={i}
            className="p-3 bg-red-50 border border-red-200 rounded-lg text-black "
          >
            <p className="font-semibold ">{a.name}</p>
            <p className="text-sm text-red-600">{a.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
