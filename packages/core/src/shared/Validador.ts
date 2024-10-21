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

    static combine(...validadores: Validador[]): ErroValidacao[] | null {
        const errosFiltrados = validadores
            .flatMap(v => v.erros)
            .filter(e => e !== null) as ErroValidacao[]

        return errosFiltrados.length > 0 ? errosFiltrados : null
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
    isNulo(erro: string = "NAO_NULO"): Validador {
        return this.valor === null || this.valor === undefined
            ? this
            : this.adicionarErro(erro)
    }

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

    temTamanhoMenorQue(
        tamanhoMaximo: number,
        incluirLimites: boolean = false,
        erro: string = "TAMANHO_INVALIDO",
    ): Validador {
        if (!this.valor) return this

        const comparacaoValida = incluirLimites
            ? this.valor.length <= tamanhoMaximo
            : this.valor.length < tamanhoMaximo;

        return comparacaoValida
            ? this
            : this.adicionarErro({ codigo: erro, max: tamanhoMaximo });
    }

    temTamanhoMaiorQue(
        tamanhoMinimo: number,
        incluirLimites: boolean = false,
        erro: string = "TAMANHO_INVALIDO",
    ): Validador {
        if (!this.valor) return this

        const comparacaoValida = incluirLimites
            ? this.valor.length >= tamanhoMinimo
            : this.valor.length > tamanhoMinimo;

        return comparacaoValida
            ? this
            : this.adicionarErro({ codigo: erro, min: tamanhoMinimo });
    }

    temValorMenorQue(
        maximo: number,
        incluirLimites: boolean = false,
        erro: string = "VALOR_ACIMA_DO_MAXIMO",
    ): Validador {
        if (!this.valor) return this

        const comparacaoValida = incluirLimites
            ? this.valor <= maximo
            : this.valor < maximo;

        return comparacaoValida
            ? this
            : this.adicionarErro({ codigo: erro, max: maximo });
    }

    temValorMaiorQue(
        minimo: number,
        incluirLimites: boolean = false,
        erro: string = "VALOR_ABAIXO_DO_MINIMO",
    ): Validador {
        if (!this.valor) return this

        const comparacaoValida = incluirLimites
            ? this.valor >= minimo
            : this.valor > minimo;

        return comparacaoValida
            ? this
            : this.adicionarErro({ codigo: erro, min: minimo });
    }

    isUuid(erro: string = "ID_INVALIDO"): Validador {
        return validate(this.valor)
            ? this
            : this.adicionarErro(erro);
    }

    isUrl(erro: string = "URL_INVALIDA"): Validador {
        try {
            new URL(this.valor)
            return this
        } catch (e: any) {
            return this.adicionarErro(erro)
        }
    }

    isEmail(erro: string = "EMAIL_INVALIDO"): Validador {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
        return emailRegex.test(this.valor) ? this : this.adicionarErro(erro)
    }

    isSenhaHash(erro: string = "HASH_INVALIDO"): Validador {
        const hashRegex = /^\$2[ayb]\$[0-9]{2}\$[A-za-z0-9\.\/]{53}$/;
        return hashRegex.test(this.valor) ? this : this.adicionarErro(erro)
    }

    isSenhaForte(erro: string = "SENHA_FRACA"): Validador {
        const senhaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
        return senhaRegex.test(this.valor) ? this : this.adicionarErro(erro)
    }

    isRegex(regex: RegExp, erro: string): Validador {
        return regex.test(this.valor) ? this : this.adicionarErro(erro)
    }
}