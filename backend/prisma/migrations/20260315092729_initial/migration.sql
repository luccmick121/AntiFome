-- CreateEnum
CREATE TYPE "StatusMunicipio" AS ENUM ('ATIVO', 'INATIVO', 'ATRASADO');

-- CreateEnum
CREATE TYPE "StatusConselho" AS ENUM ('ATIVO', 'INATIVO', 'SUSPENSO');

-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('PRESIDENTE', 'VICE', 'MEMBRO');

-- CreateEnum
CREATE TYPE "TipoReuniao" AS ENUM ('ORDINARIA', 'EXTRAORDINARIA');

-- CreateEnum
CREATE TYPE "NivelGravidade" AS ENUM ('BAIXO', 'MODERADO', 'ALTO', 'CRITICO');

-- CreateEnum
CREATE TYPE "TipoSelo" AS ENUM ('BRONZE', 'PRATA', 'OURO', 'PLATINA');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GESTOR_ESTADUAL', 'CONSELHEIRO_MUNICIPAL');

-- CreateTable
CREATE TABLE "estados" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "municipios" (
    "id" TEXT NOT NULL,
    "codigo_ibge" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "estado_id" TEXT NOT NULL,
    "populacao" INTEGER NOT NULL DEFAULT 0,
    "indice_antifome" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "StatusMunicipio" NOT NULL DEFAULT 'ATIVO',
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "municipios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conselhos" (
    "id" TEXT NOT NULL,
    "municipio_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "status" "StatusConselho" NOT NULL DEFAULT 'ATIVO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conselhos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membros" (
    "id" TEXT NOT NULL,
    "conselho_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cargo" "Cargo" NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "membros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reunioes" (
    "id" TEXT NOT NULL,
    "conselho_id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "tipo" "TipoReuniao" NOT NULL,
    "pauta" TEXT,
    "ata_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reunioes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relatorios_fome" (
    "id" TEXT NOT NULL,
    "municipio_id" TEXT NOT NULL,
    "mes_ano" TEXT NOT NULL,
    "nivel_gravidade" "NivelGravidade" NOT NULL,
    "dados_json" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "relatorios_fome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "selos" (
    "id" TEXT NOT NULL,
    "municipio_id" TEXT NOT NULL,
    "tipo" "TipoSelo" NOT NULL,
    "conquistado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "selos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "municipio_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "estados_sigla_key" ON "estados"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "municipios_codigo_ibge_key" ON "municipios"("codigo_ibge");

-- CreateIndex
CREATE INDEX "municipios_estado_id_idx" ON "municipios"("estado_id");

-- CreateIndex
CREATE INDEX "municipios_status_idx" ON "municipios"("status");

-- CreateIndex
CREATE INDEX "municipios_estado_id_status_idx" ON "municipios"("estado_id", "status");

-- CreateIndex
CREATE INDEX "conselhos_municipio_id_idx" ON "conselhos"("municipio_id");

-- CreateIndex
CREATE UNIQUE INDEX "conselhos_municipio_id_status_key" ON "conselhos"("municipio_id", "status");

-- CreateIndex
CREATE INDEX "membros_conselho_id_idx" ON "membros"("conselho_id");

-- CreateIndex
CREATE INDEX "membros_conselho_id_cargo_idx" ON "membros"("conselho_id", "cargo");

-- CreateIndex
CREATE INDEX "reunioes_conselho_id_idx" ON "reunioes"("conselho_id");

-- CreateIndex
CREATE INDEX "reunioes_conselho_id_data_idx" ON "reunioes"("conselho_id", "data" DESC);

-- CreateIndex
CREATE INDEX "relatorios_fome_municipio_id_idx" ON "relatorios_fome"("municipio_id");

-- CreateIndex
CREATE INDEX "relatorios_fome_mes_ano_idx" ON "relatorios_fome"("mes_ano");

-- CreateIndex
CREATE UNIQUE INDEX "relatorios_fome_municipio_id_mes_ano_key" ON "relatorios_fome"("municipio_id", "mes_ano");

-- CreateIndex
CREATE INDEX "selos_municipio_id_idx" ON "selos"("municipio_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "usuarios_municipio_id_idx" ON "usuarios"("municipio_id");

-- CreateIndex
CREATE INDEX "usuarios_role_idx" ON "usuarios"("role");

-- AddForeignKey
ALTER TABLE "municipios" ADD CONSTRAINT "municipios_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "estados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conselhos" ADD CONSTRAINT "conselhos_municipio_id_fkey" FOREIGN KEY ("municipio_id") REFERENCES "municipios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membros" ADD CONSTRAINT "membros_conselho_id_fkey" FOREIGN KEY ("conselho_id") REFERENCES "conselhos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reunioes" ADD CONSTRAINT "reunioes_conselho_id_fkey" FOREIGN KEY ("conselho_id") REFERENCES "conselhos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorios_fome" ADD CONSTRAINT "relatorios_fome_municipio_id_fkey" FOREIGN KEY ("municipio_id") REFERENCES "municipios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selos" ADD CONSTRAINT "selos_municipio_id_fkey" FOREIGN KEY ("municipio_id") REFERENCES "municipios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_municipio_id_fkey" FOREIGN KEY ("municipio_id") REFERENCES "municipios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
