import CasoDeUso from "../../shared/CasoDeUso";
import SenhaForte from "../../shared/SenhaForte";
import Validador from "../../shared/Validador";
import Usuario from "../model/Usuario";
import ProvedorCriptografia from "../providers/ProvedorCriptografia";
import RepositorioUsuario from "../providers/RepositorioUsuario";

export type RegistrarUsuarioEntrada = {
    nome: string,
    email: string,
    senha: string
}

export default class RegistrarUsuario implements CasoDeUso<RegistrarUsuarioEntrada, void> {
    constructor(
        private readonly repo: RepositorioUsuario,
        private readonly crypto: ProvedorCriptografia
    ) { }

    async executar(entrada: RegistrarUsuarioEntrada): Promise<void> {
        const { nome, email, senha } = entrada

        const senhaForte = new SenhaForte(senha)
        const senhaCripto = this.crypto.encrypt(senhaForte.valor);

        const usuario = new Usuario({ nome, email, senha: senhaCripto })

        const usuarioExiste = await this.repo.findByEmail(email)
        Validador.validar(usuarioExiste?.email.valor, 'Email', "Usuário").isNulo("USUARIO_JA_EXISTE").lancarSeErro()

        await this.repo.save(usuario)
    }
}