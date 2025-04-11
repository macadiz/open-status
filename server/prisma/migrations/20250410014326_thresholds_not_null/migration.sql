/*
  Warnings:

  - Made the column `dangerThreshold` on table `service_config` required. This step will fail if there are existing NULL values in that column.
  - Made the column `warningThreshold` on table `service_config` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "service_config" ALTER COLUMN "dangerThreshold" SET NOT NULL,
ALTER COLUMN "warningThreshold" SET NOT NULL;
