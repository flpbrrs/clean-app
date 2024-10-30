import Terminal from "../util/Terminal";
import { terminal } from "terminal-kit";
import Api from '../../api/Api';

export default async function loginUsuario() {
    Terminal.titulo("Login usuário")

    const email = await Terminal.requiredInput('email')
    const senha = await Terminal.requiredInput('senha', { echo: false })

    const api = new Api('http://localhost:3003')

    try {
        const usuario = await api.post<{ token: string }>('/login/', { email, senha })
        Terminal.success("Usuário logado com sucesso")
        Terminal.info(usuario.token)
    } catch (e) {
        terminal.error(JSON.stringify(e, null, 2))
    } finally {
        await Terminal.sleep()
    }
}