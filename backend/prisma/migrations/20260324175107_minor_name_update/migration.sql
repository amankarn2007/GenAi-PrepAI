/*
  Warnings:

  - You are about to drop the column `answere` on the `BehavioralQuestion` table. All the data in the column will be lost.
  - Added the required column `answer` to the `BehavioralQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BehavioralQuestion" DROP COLUMN "answere",
ADD COLUMN     "answer" TEXT NOT NULL;
