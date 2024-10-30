import Sessao from "../../data/Sessao";
import loginUsuario from "../usuario/loginUsuario";
import registrarUsuario from "../usuario/registrarUsuario";
import Terminal from "../util/Terminal";

export default async function MenuPrincipal() {
    while (true) {
        const usuario = Sessao.usuario
        const [_, reposta] = await Terminal.menu(
            `Menu Principal ${usuario ? `: ${usuario.nome}` : ''}`,
            ['Registrar usuário', 'Login Usuário', 'Sair']
        )
        switch (reposta) {
            case 'Registrar usuário':
                await registrarUsuario()
                break;
            case 'Login Usuário':
                await loginUsuario()
                break;
            case 'Sair':
                process.exit(0)
        }
    }
}