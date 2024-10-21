import Id from "../../src/shared/Id";
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

    test("Deve validar um valor nulo", () => {
        expect(Validador.validar(null).isNulo().isValido).toBeTruthy()
    })

    test("Deve gerar erro para valores não nulos", () => {
        expect(Validador.validar(3).isNulo().isInvalido).toBeTruthy()
    })

    test("Deve retornar errors vazio para texto não vazio", () => {
        const v = Validador.validar("ABC", "Nome", "NomeSimples").isNaoVazio();
        expect(v.erros).toHaveLength(0);
    })

    test("Deve retornar erro vazio para array não vazio", () => {
        const v = Validador.validar([1]).isNaoVazio()
        expect(v.erros).toHaveLength(0);
    })

    test("Deve retonar erros para texto vazio", () => {
        const v = Validador.validar("", "Nome", "NomeSimples").isNaoVazio("vazio");
        expect(v.erros[0]!.atributo).toBe("Nome")
        expect(v.erros[0]!.objeto).toBe("NomeSimples")
        expect(v.erros[0]!.codigo).toBe("vazio")
    });

    test("Deve retornar errors para array vazio", () => {
        const v = Validador.validar([], "Consultas", "Paciente").isNaoVazio("vazio")
        expect(v.erros[0]!.atributo).toBe("Consultas")
        expect(v.erros[0]!.objeto).toBe("Paciente")
        expect(v.erros[0]!.codigo).toBe("vazio")
    })

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

    test("Deve gerar erros vazios para tamanhos mínimo X", () => {
        const v1 = Validador.validar(null).temTamanhoMaiorQue(2)
        const v2 = Validador.validar('Oi, eu sou o Goku').temTamanhoMaiorQue(3)
        const v3 = Validador.validar('Leo').temTamanhoMaiorQue(3, true)
        expect(v1.erros.length).toBe(0)
        expect(v2.erros.length).toBe(0)
        expect(v3.erros.length).toBe(0)
    })

    test("Deve gerar erros para tamanhos mínimo X", () => {
        const v1 = Validador.validar('Oi, eu sou o Goku').temTamanhoMaiorQue(100)
        expect(v1.erros).toHaveLength(1)
    })

    test("Deve gerar erros vazios para valor mínimo X", () => {
        const v1 = Validador.validar(null).temValorMaiorQue(2)
        const v2 = Validador.validar(5).temValorMaiorQue(3)
        const v3 = Validador.validar(3).temValorMaiorQue(3, true)
        expect(v1.erros.length).toBe(0)
        expect(v2.erros.length).toBe(0)
        expect(v3.erros.length).toBe(0)
    })


    test("Deve gerar erros para tamanhos máximo X", () => {
        const v1 = Validador.validar('Oi, eu sou o Goku').temTamanhoMenorQue(5)
        expect(v1.erros).toHaveLength(1)
    })

    test("Deve gerar erros vazios para tamanhos máximo X", () => {
        const v1 = Validador.validar(null).temTamanhoMenorQue(2)
        const v2 = Validador.validar('Oi').temTamanhoMenorQue(3)
        const v3 = Validador.validar('Leo').temTamanhoMenorQue(3, true)
        expect(v1.erros.length).toBe(0)
        expect(v2.erros.length).toBe(0)
        expect(v3.erros.length).toBe(0)
    })

    test("Deve gerar erros vazios para valor máximo X", () => {
        const v1 = Validador.validar(null).temValorMenorQue(2)
        const v2 = Validador.validar(1).temValorMenorQue(3)
        const v3 = Validador.validar(3).temValorMenorQue(3, true)
        expect(v1.erros.length).toBe(0)
        expect(v2.erros.length).toBe(0)
        expect(v3.erros.length).toBe(0)
    })

    test("Deve combinar erros", () => {
        const msgErro = 'erro'
        const erros = Validador.combine(
            Validador.validar(3).temValorMaiorQue(10, false, msgErro),
            Validador.validar(3).temValorMenorQue(1, false, msgErro),
            Validador.validar(null).isNaoNulo(msgErro)
        )

        expect(erros).toHaveLength(3)
        expect(erros![0]!.codigo).toBe(msgErro)
        expect(erros![1]!.codigo).toBe(msgErro)
    })

    test("Deve retonar nulo quando não houver erros para combinar", () => {
        const erros = Validador.combine(
            Validador.validar(3).temValorMaiorQue(1),
            Validador.validar(3).temValorMenorQue(10),
            Validador.validar(2).isNaoNulo()
        )

        expect(erros).toBeNull()
    })

    test("Deve lançar erro", () => {
        const erroEsperado = [{ codigo: "TAMANHO_INVALIDO" }];
        try {
            Validador.lancarErro("TAMANHO_INVALIDO");
        } catch (erro) {
            expect(erro).toEqual(erroEsperado);
        }
    })

    test("Deve ignorar erros repetidos", () => {
        const v = Validador.validar(null).isNaoNulo().isNaoNulo()
        expect(v.erros.length).toBe(1)
    })

    test('Deve validar Uuid', () => {
        const v = Validador.validar(Id.gerar.valor).isUuid();
        expect(v.erros.length).toBe(0)
    })

    test('Deve retornar erro para Uuid inválido', () => {
        const v = Validador.validar('234').isUuid();
        expect(v.erros.length).toBe(1)
    })

    test('Deve validar um URL', () => {
        const v = Validador.validar('https://google.com').isUrl();
        expect(v.erros.length).toBe(0)
    })

    test('Deve retornar erro para uma url inválida', () => {
        const v = Validador.validar('google').isUrl()
        expect(v.erros.length).toBe(1)
    })

    test('Deve validar um email', () => {
        const v = Validador.validar('felipebarros.engh@gmail.com').isEmail()
        expect(v.erros.length).toBe(0)
    })

    test('Deve retornar erro para um email inválido', () => {
        const v = Validador.validar('felipebarros').isEmail()
        expect(v.erros.length).toBe(1)
    })

    test('Deve validar um hash', () => {
        const v = Validador.validar('$2a$12$dEkts23vCqtQ68zxCJn14.G.ByPoDfuGN.b.2Krx8ULCPTTros6Oi').isSenhaHash()
        expect(v.erros.length).toBe(0)
    })

    test('Deve gerar erro com hash inválido', () => {
        const v = Validador.validar('felipebarros').isSenhaHash()
        expect(v.erros.length).toBe(1)
    })

    test('Deve validar uma senha forte', () => {
        const v = Validador.validar('S3nh4@Fort3').isSenhaForte()
        expect(v.erros.length).toBe(0)
    })

    test('Deve gerar erro para uma senha fraca', () => {
        const v = Validador.validar('senhafraca').isSenhaForte()
        expect(v.erros.length).toBe(1)
    })

    test('Deve validar corretamente um regex', () => {
        const v = Validador.validar('12345678900').isRegex(/\d{11}/, "erro")
        expect(v.erros.length).toBe(0)
    })

    test('Deve gerar erros para regex inválido', () => {
        const v = Validador.validar('1234567a900').isRegex(/\d{11}/, "erro")
        expect(v.erros.length).toBe(1)
    })
});