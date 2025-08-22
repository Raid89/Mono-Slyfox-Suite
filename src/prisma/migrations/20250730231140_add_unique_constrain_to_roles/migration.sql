/*
  Warnings:

  - A unique constraint covering the columns `[name,company_id]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "roles_name_company_id_key" ON "suite"."roles"("name", "company_id");
