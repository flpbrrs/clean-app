import { RegistrarUsuario } from "core";
import ProvedorCriptografiaBcrypt from "../../auth/ProvedorCriptografiaBcrypt";
import RepositorioUsuarioPrisma from "../../db/RepositorioUSuarioPrisma";
import Terminal from "../util/Terminal";
import { terminal } from "terminal-kit";

export default async function registrarUsuario() {
    Terminal.titulo("Registar usuário")

    const nome = await Terminal.requiredInput('Nome')
    const email = await Terminal.requiredInput('email')
    const senha = await Terminal.requiredInput('senha', { echo: false })

    const userRepo = new RepositorioUsuarioPrisma();
    const crypto = new ProvedorCriptografiaBcrypt();

    try {
        const registrarUsuario = new RegistrarUsuario(userRepo, crypto);

        await registrarUsuario.executar({
            nome,
            email,
            senha
        })

        Terminal.success("Usuário criado com sucesso")
    } catch (e) {
        terminal.error(JSON.stringify(e, null, 2))
    } finally {
        await Terminal.sleep()
    }
}