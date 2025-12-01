"use client";

export default function LastConsultations() {
  const consultations = [
    { patient: "Moussa Toko", date: "2025-01-11", motif: "Douleurs" },
    { patient: "Fatou Kane", date: "2025-01-09", motif: "Contrôle" },
    { patient: "Jean K.", date: "2025-01-06", motif: "Fièvre" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Dernières consultations</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Patient</th>
            <th className="py-2">Date</th>
            <th className="py-2">Motif</th>
          </tr>
        </thead>

        <tbody>
          {consultations.map((c, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="py-2">{c.patient}</td>
              <td className="py-2">{c.date}</td>
              <td className="py-2">{c.motif}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
