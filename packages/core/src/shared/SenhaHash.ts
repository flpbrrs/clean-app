import Validador from "./Validador"

export default class SenhaHash {
    constructor(
        readonly valor: string,
        atributo?: string,
        objeto?: string,
    ) {
        Validador.validar(valor, atributo, objeto).isSenhaHash().lancarSeErro()
    }

    static isValida(hash: string): boolean {
        return Validador.validar(hash).isSenhaHash().isValido
    }
}