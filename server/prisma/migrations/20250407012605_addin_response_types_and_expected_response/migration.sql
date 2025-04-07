-- CreateEnum
CREATE TYPE "ResponseTypes" AS ENUM ('Document', 'JSON', 'XML');

-- AlterTable
ALTER TABLE "api_config" ADD COLUMN     "response_type" "ResponseTypes",
ALTER COLUMN "expectedResponse" SET DATA TYPE TEXT;
