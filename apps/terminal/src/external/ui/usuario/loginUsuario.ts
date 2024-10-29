import { LoginUsuario, RegistrarUsuario } from "core";
import ProvedorCriptografiaBcrypt from "../../auth/ProvedorCriptografiaBcrypt";
import RepositorioUsuarioPrisma from "../../db/RepositorioUSuarioPrisma";
import Terminal from "../util/Terminal";
import { terminal } from "terminal-kit";

export default async function loginUsuario() {
    Terminal.titulo("Login usuário")

    const email = await Terminal.requiredInput('email')
    const senha = await Terminal.requiredInput('senha', { echo: false })

    const userRepo = new RepositorioUsuarioPrisma();
    const crypto = new ProvedorCriptografiaBcrypt();

    try {
        const logar = new LoginUsuario(userRepo, crypto);

        const usuario = await logar.executar({
            email,
            senha
        })

        Terminal.success("Usuário logado com sucesso")
        Terminal.info(JSON.stringify(usuario.props, null, 2))
    } catch (e) {
        terminal.error(JSON.stringify(e, null, 2))
    } finally {
        await Terminal.sleep()
    }
}