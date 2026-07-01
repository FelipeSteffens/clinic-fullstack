/*
  Warnings:

  - Added the required column `paciente_id` to the `exame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exame" ADD COLUMN     "paciente_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "prontuario" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3),
    "medico_responsavel_id" INTEGER NOT NULL,
    "paciente_id" INTEGER NOT NULL,

    CONSTRAINT "prontuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consulta" (
    "id" SERIAL NOT NULL,
    "motivo" TEXT NOT NULL,
    "data_consulta" TIMESTAMP(3) NOT NULL,
    "observacoes" TEXT NOT NULL,
    "medico_responsavel_id" INTEGER NOT NULL,
    "paciente_id" INTEGER NOT NULL,

    CONSTRAINT "consulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paciente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "sexo" TEXT NOT NULL,
    "responsavel" TEXT,

    CONSTRAINT "paciente_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exame" ADD CONSTRAINT "exame_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prontuario" ADD CONSTRAINT "prontuario_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prontuario" ADD CONSTRAINT "prontuario_medico_responsavel_id_fkey" FOREIGN KEY ("medico_responsavel_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
