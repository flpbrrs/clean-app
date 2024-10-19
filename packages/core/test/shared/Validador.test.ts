import Validador from "../../src/shared/Validador";

describe('Validador', () => {
    test("Deve retornar válido com texto não nulo", () => {
        expect(Validador.validar("Bom dia").isNaoNulo().isValido).toBeTruthy()
    });
    test("Deve retornar erro com mensagem para um valor nulo", () => {
        const erroMensagem = "nulo";

        expect(Validador.validar(null).isNaoNulo().isInvalido).toBeTruthy()
        expect(
            Validador
                .validar(null)
                .isNaoNulo(erroMensagem)
                .erros[0]!.codigo
        ).toBe(erroMensagem);
    });

    test("Deve retornar errors vazio para texto não vazio", () => {
        const v = Validador.validar("ABC", "Nome", "NomeSimples").isNaoVazio();
        expect(v.erros).toHaveLength(0);
    })

    test("Deve retonar erros para texto vazio", () => {
        const v = Validador.validar("", "Nome", "NomeSimples").isNaoVazio("vazio");
        expect(v.erros[0]!.atributo).toBe("Nome")
        expect(v.erros[0]!.objeto).toBe("NomeSimples")
        expect(v.erros[0]!.codigo).toBe("vazio")
    });
    test("Deve retornar erro com texto vazio", () => {
        const msgErro = "Texto inválido";
        const e1 = Validador
            .validar("   ")
            .isNaoVazio(msgErro)
            .erros[0]

        expect(e1?.codigo).toBe(msgErro)
    });
    test("Deve retornar erro com texto nulo", () => {
        const msgErro = "Texto inválido";
        const e1 = Validador
            .validar("   ")
            .isNaoVazio(msgErro)
            .erros[0]

        expect(e1?.codigo).toBe(msgErro)
    });
    test("Deve retornar erro com texto indefinido", () => {
        const msgErro = "Texto inválido";
        const e1 = Validador
            .validar("   ")
            .isNaoVazio(msgErro)
            .erros[0]

        expect(e1?.codigo).toBe(msgErro)
    });
});