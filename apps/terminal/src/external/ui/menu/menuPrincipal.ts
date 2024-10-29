import loginUsuario from "../usuario/loginUsuario";
import registrarUsuario from "../usuario/registrarUsuario";
import Terminal from "../util/Terminal";

export default async function MenuPrincipal() {
    while (true) {
        const [_, reposta] = await Terminal.menu("Menu Principal", ['Registrar usuário', 'Login Usuário', 'Sair'])
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