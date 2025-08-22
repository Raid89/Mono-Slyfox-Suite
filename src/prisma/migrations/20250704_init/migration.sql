-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "suite";

-- CreateTable
CREATE TABLE "suite"."companies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "nit" VARCHAR(50) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(30) NOT NULL,
    "email" VARCHAR(150) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suite"."users" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "role_id" INTEGER,
    "document" VARCHAR(50) NOT NULL,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "email_verification_token" VARCHAR,
    "hashedRt" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suite"."company_modules" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER,
    "module_id" INTEGER,
    "activated_by_subscription" BOOLEAN DEFAULT true,

    CONSTRAINT "company_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suite"."modules" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suite"."permissions" (
    "id" SERIAL NOT NULL,
    "module_id" INTEGER,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suite"."plan_modules" (
    "id" SERIAL NOT NULL,
    "plan_id" INTEGER,
    "module_id" INTEGER,

    CONSTRAINT "plan_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suite"."plans" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "monthly_price" DECIMAL(10,2) DEFAULT 0.00,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suite"."role_permissions" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER,
    "permission_id" INTEGER,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suite"."roles" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suite"."subscriptions" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER,
    "plan_id" INTEGER,
    "start_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(6),
    "status" VARCHAR(20) DEFAULT 'active',
    "auto_renew" BOOLEAN DEFAULT true,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_nit" ON "suite"."companies"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "unique_company_email" ON "suite"."companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "idx_users_email" ON "suite"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "unique_document" ON "suite"."users"("document");

-- CreateIndex
CREATE INDEX "idx_users_company" ON "suite"."users"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_modules_company_id_module_id_key" ON "suite"."company_modules"("company_id", "module_id");

-- CreateIndex
CREATE UNIQUE INDEX "modules_name_key" ON "suite"."modules"("name");

-- CreateIndex
CREATE INDEX "idx_permissions_module" ON "suite"."permissions"("module_id");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_module_id_name_key" ON "suite"."permissions"("module_id", "name");

-- CreateIndex
CREATE INDEX "idx_plan_modules_module" ON "suite"."plan_modules"("module_id");

-- CreateIndex
CREATE INDEX "idx_plan_modules_plan" ON "suite"."plan_modules"("plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "plan_modules_plan_id_module_id_key" ON "suite"."plan_modules"("plan_id", "module_id");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_role_id_permission_id_key" ON "suite"."role_permissions"("role_id", "permission_id");

-- CreateIndex
CREATE INDEX "idx_roles_company" ON "suite"."roles"("company_id");

-- CreateIndex
CREATE INDEX "idx_subscriptions_status" ON "suite"."subscriptions"("status");

-- AddForeignKey
ALTER TABLE "suite"."users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "suite"."companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suite"."users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "suite"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suite"."company_modules" ADD CONSTRAINT "company_modules_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "suite"."companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suite"."company_modules" ADD CONSTRAINT "company_modules_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "suite"."modules"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suite"."permissions" ADD CONSTRAINT "permissions_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "suite"."modules"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suite"."plan_modules" ADD CONSTRAINT "plan_modules_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "suite"."modules"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suite"."plan_modules" ADD CONSTRAINT "plan_modules_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "suite"."plans"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suite"."role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "suite"."permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suite"."role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "suite"."roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suite"."roles" ADD CONSTRAINT "roles_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "suite"."companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suite"."subscriptions" ADD CONSTRAINT "subscriptions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "suite"."companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suite"."subscriptions" ADD CONSTRAINT "subscriptions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "suite"."plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

