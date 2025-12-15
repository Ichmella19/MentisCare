import { assignDoctorToPatient } from "@/app/admin/(others-pages)/patients/action";

import prisma from "@/lib/db";
import { createNotification } from "@/lib/notification";

jest.mock("@/lib/prisma", () => ({
  patient: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  user: {
    findUnique: jest.fn(),
  },
}));

jest.mock("@/lib/notifications", () => ({
  createNotification: jest.fn(),
}));

describe("assignDoctorToPatient", () => {

  afterEach(() => jest.clearAllMocks());

  test("❌ retourne erreur si le patient n'existe pas", async () => {
  jest.spyOn(prisma.patient, "findUnique").mockResolvedValue(null);

  await expect(assignDoctorToPatient(99, "doc123"))
    .rejects
    .toThrow("Patient non trouvé");
});

 
  test("✔️ assigne le médecin correctement", async () => {
    jest.spyOn(prisma.patient, "findUnique").mockResolvedValue({ 
      id: 123456,
  name: "Dr. John Doe",
  email: "john.doe@example.com",
  createdAt: new Date("2023-01-01T10:00:00Z"),
  updatedAt: new Date("2023-12-01T12:00:00Z"),
  role: "DOCTOR" });
    jest.spyOn(prisma.user, "findUnique").mockResolvedValue({ id: "doc123" });
    jest.spyOn(prisma.patient, "update").mockResolvedValue({});
    (prisma.patient.findUnique as jest.Mock).mockResolvedValue({ id: 1, name: "John Doe" });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "doc123" });
    (prisma.patient.update as jest.Mock).mockResolvedValue({});

    const result = await assignDoctorToPatient(1, "doc123");

    expect(result.success).toBe(true);
    expect(createNotification).toHaveBeenCalled();
  });

});
