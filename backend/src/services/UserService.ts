import type { Usuario } from "../prisma/generated/prisma/client";
import { createHash } from "../utils/createHash";
import bcrypt from "bcrypt";
import { userRepository, type UserRepository } from "../repositories/UserRepository";

export class UserService {
    constructor(private readonly repository: UserRepository) { // TO-DO TIPAR SERVICE
    }

    async listarTodosUsuarios() {
        const usuarios = await this.repository.listarTodosUsuarios()
        return usuarios
    }

    async criarUsuario(dadosUsuario: Usuario) {
        const hash = await createHash(dadosUsuario.senha);

        const usuarioCriado = await this.repository.criarUsuario({
            email: dadosUsuario.email,
            nome: dadosUsuario.nome || null,
            role: dadosUsuario.role || null,
            senha: hash
        })
        return usuarioCriado
    }

    async buscarUsuarioId(idUsuario: number) {
        const usuario = await this.repository.buscarUsuarioId(idUsuario);
        return usuario;
    }

    async atualizarUsuario(idUsuario: number, dadosParaAtualizar: Omit<Usuario, 'id'>) {
        const usuarioAtualizado = await this.repository.atualizarUsuario(idUsuario, dadosParaAtualizar)
        return usuarioAtualizado;
    }


    async deletarUsuario(idUsuario: number) {
        const usuario = await this.repository.deletarUsuario(idUsuario);
        return usuario;
    }
}

export const userService = new UserService(userRepository)