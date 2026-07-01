import { Router } from "express";
import { consultationController } from "../controllers/ConsultationController";

export const consultationRouter = Router()

consultationRouter.get('/consulta', async (_, res) => {
  return consultationController.listarTodasConsultas(_, res)
})

consultationRouter.get('/consulta/:id', async (req, res) => {
  return consultationController.buscarConsultaId(req, res)
})

consultationRouter.post("/consulta", async (req, res) => {
  return consultationController.criarConsulta(req, res)
})

consultationRouter.put("/consulta/:id", async (req, res) => {
  return consultationController.atualizarConsulta(req, res)
})

consultationRouter.delete('/consulta/:id', async (req, res) => {
  return consultationController.deletarConsulta(req, res)
})