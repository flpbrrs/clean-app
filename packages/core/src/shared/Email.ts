import Validador from "./Validador"

export default class Email {
    constructor(
        readonly valor: string = "",
        atributo?: string,
        objeto?: string,
    ) {
        this.valor = valor.trim()
        Validador.validar(valor, atributo, objeto).isEmail().lancarSeErro()
    }

    get usuario(): string {
        return this.valor.split("@")[0]!
    }

    get dominio(): string {
        return this.valor.split("@")[1]!
    }

    static isValido(email: string): boolean {
        return Validador.validar(email).isEmail().isValido
    }
}