import { Router } from "express";
import { patientController } from "../controllers/PatientController";

export const pacienteRouter = Router()

pacienteRouter.get('/paciente', async (_, res) => {
  return patientController.listarTodosPacientes(_, res)
})

pacienteRouter.get('/paciente/:id', async (req, res) => {
  return patientController.buscarPacienteId(req, res)
})

pacienteRouter.post("/paciente", async (req, res) => {
  return patientController.criarPaciente(req, res)
})

pacienteRouter.put("/paciente/:id", async (req, res) => {
  return patientController.atualizarPaciente(req, res)
})

pacienteRouter.delete('/paciente/:id', async (req, res) => {
  return patientController.deletarPaciente(req, res)
})