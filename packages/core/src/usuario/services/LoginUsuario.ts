import CasoDeUso from "../../shared/CasoDeUso";
import Email from "../../shared/Email";
import Validador from "../../shared/Validador";
import Usuario from "../model/Usuario";
import ProvedorCriptografia from "../providers/ProvedorCriptografia";
import RepositorioUsuario from "../providers/RepositorioUsuario";

export type Entrada = { email: string, senha: string }

export default class LoginUsuario implements CasoDeUso<Entrada, Usuario> {
    constructor(
        private repo: RepositorioUsuario,
        private crypto: ProvedorCriptografia
    ) { }

    async executar(entrada: Entrada): Promise<Usuario> {
        const email = new Email(entrada.email, "email")

        const usuario = await this.repo.findByEmail(email.valor)
        if (!usuario) Validador.lancarErro("USUARIO_NAO_EXISTE")

        const mesmaSenha = this.crypto.compare(entrada.senha, usuario.senha!.valor)

        if (!mesmaSenha) Validador.lancarErro("SENHA_INCORRETA")
        return usuario.semSenha()
    }
}