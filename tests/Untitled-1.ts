import { assignDoctorToPatient } from "@/app/admin/(others-pages)/patients/action";
import prisma from "@/lib/db";
import { createNotification } from "@/lib/notification";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    patient: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("@/lib/notifications/createNotification", () => ({
  createNotification: jest.fn(),
}));

describe("assignDoctorToPatient", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("❌ retourne erreur si le patient n'existe pas", async () => {
    (prisma.patient.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await assignDoctorToPatient(99, "doc123");

    expect(result).toEqual({
      success: false,
      message: "Patient non trouvé.",
    });
  });

  test("❌ retourne erreur si le médecin n'existe pas", async () => {
    (prisma.patient.findUnique as jest.Mock).mockResolvedValue({ id: 1, name: "John" });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await assignDoctorToPatient(1, "doc123");

    expect(result).toEqual({
      success: false,
      message: "Médecin non trouvé.",
    });
  });

  test("✅ assigne le médecin au patient et envoie une notification", async () => {
    (prisma.patient.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      name: "John",
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "doc123",
      role: "USER",
    });

    (prisma.patient.update as jest.Mock).mockResolvedValue({});

    const result = await assignDoctorToPatient(1, "doc123");

    expect(prisma.patient.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        user: { connect: { id: "doc123" } },
      },
    });

    expect(createNotification).toHaveBeenCalledWith(
      "doc123",
      "Nouveau patient assigné",
      "Le patient John vous a été assigné.",
      "ASSIGNMENT",
      `/admin/mespatients`
    );

    expect(result).toEqual({
      success: true,
      message: "Médecin assigné au patient avec succès.",
    });
  });
});
