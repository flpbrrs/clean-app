import Validador from "./Validador";

export default class NomePessoa {
    constructor(readonly completo?: string, atibuto?: string, objeto?: string) {
        this.completo = this.completo?.trim() || "";

        Validador.validar(this.completo, atibuto, objeto)
            .isNaoVazio()
            .temTamanhoMaiorQue(4, true)
            .temTamanhoMenorQue(120, true)
            .isRegex(/^[a-zA-zÀ-ú'\.-\s]*$/, "CARACTERES_INVÁLIDOS")
            .lancarSeErro()

        Validador.validar(this.completo.split(" ")[1], atibuto)
            .isNaoVazio("SOBRENOME_INVÁLIDO")
            .lancarSeErro()
    }

    get primeiroNome() {
        return this.completo!.split(" ")[0]
    }

    get sobrenomes(): string[] {
        return this.completo!.split(" ").slice(1)
    }
}