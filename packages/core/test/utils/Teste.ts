import ErroValidacao from "../../src/error/ErroValidacao";

export default class Teste {
    static comErro(fn: () => void, ...erros: ErroValidacao[]) {
        try {
            fn();
            throw new Error('Deve lançar erro incondicionalmente');
        } catch (e: any) {
            Teste.checarErros(e, ...erros);
        }
    }

    static async comErroSync(fn: () => Promise<any>, ...erros: ErroValidacao[]) {
        try {
            await fn();
            throw new Error('Deve lançar erro incondicionalmente');
        } catch (e: any) {
            Teste.checarErros(e, ...erros)
        }
    }

    private static checarErros(e: any, ...erros: ErroValidacao[]) {
        if (!Array.isArray(e)) throw e
        erros.forEach((erro, i) => {
            if (erro.codigo) expect(e[i]).toHaveProperty("codigo", erro.codigo);
            if (erro.atributo) expect(e[i]).toHaveProperty("atributo", erro.atributo);
            if (erro.objeto) expect(e[i]).toHaveProperty("objeto", erro.objeto);
            if (erro.valor) expect(e[i]).toHaveProperty("valor", erro.valor);
        })
    }
}