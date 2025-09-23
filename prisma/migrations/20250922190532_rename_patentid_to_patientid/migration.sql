/*
  Warnings:

  - You are about to drop the column `patentId` on the `Suivi` table. All the data in the column will be lost.
  - Added the required column `patientId` to the `Suivi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Suivi" DROP CONSTRAINT "Suivi_patentId_fkey";

-- AlterTable
ALTER TABLE "Suivi" DROP COLUMN "patentId",
ADD COLUMN     "patientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Suivi" ADD CONSTRAINT "Suivi_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
