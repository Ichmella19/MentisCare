"use client";

export default function DoctorProfileCard() {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">

      <h2 className="text-lg font-semibold mb-4">Profil du Médecin</h2>

      <div className="flex items-center gap-4">
        <img
          src="/avatar-default.png"
          className="w-16 h-16 rounded-full border"
          alt="avatar"
        />

        <div>
          <p className="text-xl font-semibold">Dr. Jean Dupont</p>
          <p className="text-gray-500 text-sm">Généraliste</p>
        </div>
      </div>

      <div className="mt-5 space-y-2 text-sm">
        <p><strong>Email :</strong> jean.dupont@example.com</p>
        <p><strong>Téléphone :</strong> +229 66 77 88 99</p>
        <p><strong>Expérience :</strong> 12 ans</p>
      </div>

    </div>
  );
}
