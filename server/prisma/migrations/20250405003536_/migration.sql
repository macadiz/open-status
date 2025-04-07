/*
  Warnings:

  - A unique constraint covering the columns `[service_config_id]` on the table `api_config` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[service_id]` on the table `service_config` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceConfigId` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service" ADD COLUMN     "serviceConfigId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "api_config_service_config_id_key" ON "api_config"("service_config_id");

-- CreateIndex
CREATE UNIQUE INDEX "service_config_service_id_key" ON "service_config"("service_id");
