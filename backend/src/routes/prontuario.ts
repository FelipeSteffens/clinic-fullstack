import { Router } from "express";
import { prontuarioController } from "../controllers/ProntuarioController";

export const prontuarioRouter = Router()

prontuarioRouter.get('/prontuario', async (_, res) => {
  return prontuarioController.listarTodosProntuarios(_, res)
})

prontuarioRouter.get('/prontuario/:id', async (req, res) => {
  return prontuarioController.buscarProntuarioId(req, res)
})

prontuarioRouter.post("/prontuario", async (req, res) => {
  return prontuarioController.criarProntuario(req, res)
})

prontuarioRouter.put("/prontuario/:id", async (req, res) => {
  return prontuarioController.atualizarProntuario(req, res)
})

prontuarioRouter.delete('/prontuario/:id', async (req, res) => {
  return prontuarioController.deletarProntuario(req, res)
})