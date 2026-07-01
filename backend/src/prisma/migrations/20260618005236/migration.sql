/*
  Warnings:

  - You are about to drop the column `data` on the `prontuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "prontuario" DROP COLUMN "data",
ADD COLUMN     "data_prontuario" TIMESTAMP(3);
