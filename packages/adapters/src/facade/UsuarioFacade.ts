import { LoginUsuario, ProvedorCriptografia, RegistrarUsuario, RepositorioUsuario } from "core";
import { UsuarioDTO } from "../dto";

export default class UsuarioFacade {
    constructor(
        private readonly repo?: RepositorioUsuario,
        private readonly crypto?: ProvedorCriptografia
    ) { }

    async registrar(dto: UsuarioDTO): Promise<void> {
        const uc = new RegistrarUsuario(this.repo!, this.crypto!)
        await uc.executar({
            nome: dto.nome!,
            email: dto.email!,
            senha: dto.senha!
        })
    }

    async login(dto: UsuarioDTO): Promise<UsuarioDTO> {
        const uc = new LoginUsuario(this.repo!, this.crypto!)
        const usuario = await uc.executar({
            email: dto.email!,
            senha: dto.senha!
        })

        return usuario.props
    }
}