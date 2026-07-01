import type { Consulta, Paciente } from "../prisma/generated/prisma/client";
import { pacienteRepository, PatientRepository } from "../repositories/PatientRepository";

export class PatientService {
    constructor(private readonly repository: PatientRepository) { // TO-DO TIPAR SERVICE
    }

    async listarTodosPacientes() {
        const paciente = await this.repository.listarTodosPacientes()
        return paciente
    }

    async criarPaciente(dadosPaciente: Paciente) {

        const pacienteCriado = await this.repository.criarPaciente({
                nome: dadosPaciente.nome || "",
                cpf: dadosPaciente.cpf || "",
                telefone: dadosPaciente.telefone || "",
                email: dadosPaciente.email || "",
                data_nascimento: new Date(dadosPaciente.data_nascimento || ""),
                sexo: dadosPaciente.sexo || "",
                responsavel: dadosPaciente.responsavel || ""
        })
        return pacienteCriado
    }

    async buscarPacienteId(idPaciente: number) {
        const paciente = await this.repository.buscarPacienteId(idPaciente);
        return paciente;
    }

    async atualizarPaciente(idPaciente: number, dadosParaAtualizar: Omit<Paciente, 'id'>) {
        const pacineteAtualizado = await this.repository.atualizarPaciente(idPaciente, dadosParaAtualizar)
        return pacineteAtualizado;
    }


    async deletarPaciente(idPaciente: number) {
        const paciente = await this.repository.deletarPaciente(idPaciente);
        return paciente;
    }
}

export const patientService = new PatientService(pacienteRepository)