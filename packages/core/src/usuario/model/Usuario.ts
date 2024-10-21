import Email from "../../shared/Email";
import Entidade, { EntidadeProps } from "../../shared/Entidade";
import NomePessoa from "../../shared/NomePessoa";
import SenhaHash from "../../shared/SenhaHash";

export interface UsuarioProps extends EntidadeProps {
    nome?: string,
    email?: string,
    senha?: string,
    isAdmin: boolean
}

export default class Usuario extends Entidade<Usuario, UsuarioProps> {
    readonly nome: NomePessoa
    readonly email: Email
    readonly senha: SenhaHash | null
    readonly isAdmin: boolean

    constructor(props: UsuarioProps) {
        super(props)

        this.nome = new NomePessoa(props.nome)
        this.email = new Email(props.email)
        this.senha = props.senha ? new SenhaHash(props.senha) : null
        this.isAdmin = props.isAdmin ?? false;
    }
}