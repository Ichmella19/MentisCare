/*
  Warnings:

  - A unique constraint covering the columns `[matricule]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matricule` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "matricule" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_matricule_key" ON "Patient"("matricule");
