import registrarUsuario from "../usuario/registrarUsuario";
import Terminal from "../util/Terminal";

export default async function MenuPrincipal() {
    while (true) {
        const [_, reposta] = await Terminal.menu("Menu Principal", ['Registrar usuário', 'Sair'])
        switch (reposta) {
            case 'Registrar usuário':
                await registrarUsuario()
                break;
            case 'Sair':
                process.exit(0)
        }
    }
}