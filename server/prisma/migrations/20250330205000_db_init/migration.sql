-- CreateEnum
CREATE TYPE "ServiceTypes" AS ENUM ('API');

-- CreateEnum
CREATE TYPE "APIParamTypes" AS ENUM ('Header', 'Query');

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,
    "alias" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_config" (
    "id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "uptimeThreshold" INTEGER NOT NULL,
    "checkInterval" INTEGER NOT NULL,
    "type" "ServiceTypes" NOT NULL,

    CONSTRAINT "service_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_config" (
    "id" TEXT NOT NULL,
    "service_config_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "body" JSONB,

    CONSTRAINT "api_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_config_param" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "api_config_id" TEXT,
    "type" "APIParamTypes" NOT NULL,

    CONSTRAINT "api_config_param_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_log" (
    "id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "message" TEXT,

    CONSTRAINT "service_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incident" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incident_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "service_config" ADD CONSTRAINT "service_config_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_config" ADD CONSTRAINT "api_config_service_config_id_fkey" FOREIGN KEY ("service_config_id") REFERENCES "service_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_config_param" ADD CONSTRAINT "api_config_param_api_config_id_fkey" FOREIGN KEY ("api_config_id") REFERENCES "api_config"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_log" ADD CONSTRAINT "service_log_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
