import  prisma  from "@/lib/db"; // adapte le chemin si besoin

async function main() {
  const suivi = await prisma.suivi.create({
    data: {
      description: "Consultation initiale",
      prescription: "Paracétamol 500mg",
      fichier: "rapport1.pdf",
      patientId: 1,   // ⚠️ Mets l’ID d’un patient existant
      userId: "abc123", // ⚠️ Mets l’ID d’un user existant
    },
  });

  console.log("✅ Suivi créé :", suivi);
}

main()
  .catch((e) => {
    console.error("❌ Erreur :", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
