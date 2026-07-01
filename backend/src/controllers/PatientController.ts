import type { Request, Response } from "express";
import type { Consulta, Exame, Paciente, Usuario } from "../prisma/generated/prisma/client"
import { PatientService, patientService } from "../services/PatientService";


class PatientController {
    constructor(private readonly service: PatientService) {
    }

    async listarTodosPacientes(req: Request, res: Response) {
        try {
            const paciente = await this.service.listarTodosPacientes();
            return res.status(200).json(paciente)
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }

    async criarPaciente(req: Request, res: Response) {
        try {
            const dadosPaciente = req.body as Paciente
            const pacienteCriado = await this.service.criarPaciente(dadosPaciente)
            return res.status(201).json(pacienteCriado)
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }

    async buscarPacienteId(req: Request, res: Response) {
        try {
            const idPaciente = Number(req.params.id)
            const paciente = await this.service.buscarPacienteId(idPaciente)
            return res.status(200).json(paciente)
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }

    async atualizarPaciente(req: Request, res: Response) {
        try {
            const idPaciente = Number(req.params.id)
            const dadosParaAtualizar = req.body as Omit<Paciente, 'id'>
            const pacineteAtualizado = await this.service.atualizarPaciente(idPaciente, dadosParaAtualizar)
            return res.status(200).json(pacineteAtualizado);
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }


    async deletarPaciente(req: Request, res: Response) {
        try {
            const idPaciente = Number(req.params.id)
            const paciente = await this.service.deletarPaciente(idPaciente)
            return res.status(200).json({
                mensagem: "Paciente deletado com sucesso!",
                data: paciente
            });
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }
}
export const patientController = new PatientController(patientService)