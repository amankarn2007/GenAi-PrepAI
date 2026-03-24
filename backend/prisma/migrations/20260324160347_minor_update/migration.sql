/*
  Warnings:

  - You are about to drop the column `answere` on the `TechnicalQuestion` table. All the data in the column will be lost.
  - Added the required column `answer` to the `TechnicalQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TechnicalQuestion" DROP COLUMN "answere",
ADD COLUMN     "answer" TEXT NOT NULL;
