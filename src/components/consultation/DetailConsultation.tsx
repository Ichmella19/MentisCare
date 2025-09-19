// /src/app/admin/(others-pages)/consultations/[id]/page.tsx
import { listReservationsByConsultation } from "@/app/admin/(others-pages)/consultations/action";

type Props = {
  params: { id: string };
};

export default async function DetailConsultationPage({ params }: Props) {
  const consultationId = parseInt(params.id, 10);

  // On récupère les réservations pour cette consultation
  const reservations = await listReservationsByConsultation(consultationId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Détails de la consultation #{consultationId}
      </h1>

      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée pour ce créneau.</p>
      ) : (
        <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {reservations.map((r: any) => (
            <div key={r.id} className="border p-4 rounded-md shadow">
              <p><strong>Utilisateur :</strong> {r.user?.name ?? "Anonyme"}</p>
              <p><strong>Date :</strong> {new Date(r.date).toLocaleDateString()}</p>
              <p><strong>Heure :</strong> {r.heureDebut} - {r.heureFin}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
