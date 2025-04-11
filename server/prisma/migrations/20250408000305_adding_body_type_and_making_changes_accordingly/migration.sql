/*
  Warnings:

  - The `response_type` column on the `api_config` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "IOTypes" AS ENUM ('Document', 'JSON', 'XML');

-- AlterTable
ALTER TABLE "api_config" ADD COLUMN     "body_type" "IOTypes",
ALTER COLUMN "body" SET DATA TYPE TEXT,
DROP COLUMN "response_type",
ADD COLUMN     "response_type" "IOTypes";

-- DropEnum
DROP TYPE "ResponseTypes";
