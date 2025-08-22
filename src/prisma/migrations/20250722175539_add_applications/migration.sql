-- AlterTable
ALTER TABLE "suite"."modules" ADD COLUMN     "application_id" INTEGER;

-- CreateTable
CREATE TABLE "suite"."applications" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "applications_name_key" ON "suite"."applications"("name");

-- AddForeignKey
ALTER TABLE "suite"."modules" ADD CONSTRAINT "modules_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "suite"."applications"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
