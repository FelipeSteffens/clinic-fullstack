import { Router } from "express";
import { examController } from "../controllers/ExamController";

export const exameRouter = Router()

exameRouter.get('/exames', async (_, res) => {
  return examController.listarTodosExames(_, res)
})

exameRouter.get('/exames/:id', async (req, res) => {
  return examController.buscarExameId(req, res)
})

exameRouter.post("/exames", async (req, res) => {
  return examController.criarExame(req, res)
})

exameRouter.put("/exames/:id", async (req, res) => {
  return examController.atualizarExame(req, res)
})

exameRouter.delete('/exames/:id', async (req, res) => {
  return examController.deletarExame(req, res)
})