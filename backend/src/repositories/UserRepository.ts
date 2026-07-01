import type { PrismaClient, Token, Usuario } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class UserRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }

    async listarTodosUsuarios() {
        const usuarios = await prisma.usuario.findMany();
        return usuarios
    }

    async buscarUsuarioId(idUsuario: number) {
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: idUsuario
            }
        })
        return usuario;
    }

    async criarUsuario(dadosUsuario: Partial<Usuario>) {
        console.log(dadosUsuario)
        return await this.prisma.usuario.create({
            data: {
                email: dadosUsuario.email || "",
                senha: dadosUsuario.senha || "",
                nome: dadosUsuario.nome || "",
                role: dadosUsuario.role || "USER",
            }
        })
    }

    async atualizarUsuario(idUsuario: number, dadosParaAtualizar: Omit<Usuario, 'id'>) {
        const usuarioAtualizado = await prisma.usuario.update({
            data: {
                ...dadosParaAtualizar
            },
            where: {
                id: idUsuario
            }
        })

        return usuarioAtualizado
    }
    async deletarUsuario(idUsuario: number) {
        const usuario = await prisma.usuario.delete({
            where: {
                id: idUsuario
            }
        })
        return usuario;
    }
}

export const userRepository = new UserRepository(prisma)
