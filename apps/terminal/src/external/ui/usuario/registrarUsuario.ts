import Terminal from "../util/Terminal";
import { terminal } from "terminal-kit";
import Api from "../../api/Api";

export default async function registrarUsuario() {
    Terminal.titulo("Registar usuário")

    const nome = await Terminal.requiredInput('Nome')
    const email = await Terminal.requiredInput('email')
    const senha = await Terminal.requiredInput('senha', { echo: false })

    const api = new Api('http://localhost:3003')

    try {
        await api.post('/usuario/', {
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