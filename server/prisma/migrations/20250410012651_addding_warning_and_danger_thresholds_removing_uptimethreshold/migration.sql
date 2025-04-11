/*
  Warnings:

  - You are about to drop the column `uptimeThreshold` on the `service_config` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "service_config" DROP COLUMN "uptimeThreshold",
ADD COLUMN     "dangerThreshold" INTEGER,
ADD COLUMN     "warningThreshold" INTEGER;
