/*
  Warnings:

  - Added the required column `is_available` to the `service_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service_log" ADD COLUMN     "is_available" BOOLEAN NOT NULL;
