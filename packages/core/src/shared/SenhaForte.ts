import Validador from './Validador'

export default class SenhaForte {
    constructor(
        readonly valor: string = '',
        atributo?: string,
        objeto?: string
    ) {
        Validador.validar(valor, atributo, objeto).isNaoNulo().isSenhaForte().lancarSeErro()
    }

    static isValida(senha: string): boolean {
        return Validador.validar(senha).isSenhaForte().isValido
    }
}