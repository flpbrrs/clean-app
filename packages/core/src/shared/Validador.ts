import { validate } from "uuid";
import ErroValidacao from "../error/ErroValidacao";

export default class Validador {
    private constructor(
        readonly valor: any,
        readonly atributo: string | null,
        readonly objeto: string | null,
        readonly erros: ErroValidacao[] = []
    ) { }

    static validar(valor: any, atributo?: string, objeto?: string): Validador {
        return new Validador(valor, atributo ?? null, objeto || null);
    }

    static lancarErro(erro: string): never {
        throw [{ codigo: erro } as ErroValidacao]
    }

    lancarSeErro(): void | never {
        if (!this.erros.length) return;
        throw this.erros;
    }

    private erroJaExiste(erro: ErroValidacao): boolean {
        return this.erros
            .some(e => Object.keys(e).every(key => e[key] === erro[key]))
    }

    private adicionarErro(codigoErro: string | ErroValidacao): Validador {
        const erroBase = typeof codigoErro === 'string'
            ? { codigo: codigoErro }
            : codigoErro;

        const erro = {
            ...erroBase,
            valor: this.valor,
            atributo: this.atributo ?? undefined,
            objeto: this.objeto ?? undefined
        }

        if (this.erroJaExiste(erro)) return this;
        return new Validador(this.valor, this.atributo, this.objeto, [
            ...this.erros,
            erro
        ])
    }

    get isValido(): boolean {
        return this.erros.length === 0;
    }

    get isInvalido(): boolean {
        return !this.isValido;
    }

    // Validadores
    isNaoNulo(erro: string = "NULO"): Validador {
        return this.valor !== null && this.valor !== undefined
            ? this
            : this.adicionarErro(erro);
    }

    isNaoVazio(erro: string = "VAZIO"): Validador {
        const validador = this.isNaoNulo(erro);
        if (Array.isArray(validador.valor)) {
            return validador.valor.length > 0
                ? validador
                : this.adicionarErro(erro);
        }
        return validador.valor?.trim() !== ""
            ? validador
            : this.adicionarErro(erro);
    }

    uuid(erro: string = "ID_INVÁLIDO"): Validador {
        const validador = this.isNaoNulo(erro);
        return validate(this.valor)
            ? this
            : this.adicionarErro(erro);
    }
}