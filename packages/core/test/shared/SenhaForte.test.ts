import SenhaForte from "../../src/shared/SenhaForte"
import Teste from "../utils/Teste"

describe('Senha forte', () => {
    test("Deve lançar erro com senha vazia", () => {
        Teste.comErro(() => new SenhaForte(), { codigo: "SENHA_FRACA" })
        Teste.comErro(() => new SenhaForte(""), { codigo: "SENHA_FRACA" })
    })

    test("Deve lançar erro com senha apenas com números", () => {
        Teste.comErro(() => new SenhaForte("1234567890"), { codigo: "SENHA_FRACA" })
    })

    test("Deve lançar erro com senha apenas com letras", () => {
        Teste.comErro(() => new SenhaForte("AbCdEfGhIj"), { codigo: "SENHA_FRACA" })
    })

    test("Deve lançar erro com senha apenas com caracteres especiais", () => {
        Teste.comErro(() => new SenhaForte("!@#$%¨&*()_+"), { codigo: "SENHA_FRACA" })
    })

    test("Deve lançar erro com senha com menos de 8 caracteres", () => {
        Teste.comErro(() => new SenhaForte("%S3nh4%"), { codigo: "SENHA_FRACA" })
    })

    test("Deve criar senha forte", () => {
        const senha = "S3nh4F0rt3%"
        expect(new SenhaForte(senha).valor).toBe(senha)
    })

    test("Deve validar senha forte", () => {
        expect(SenhaForte.isValida("123456")).toBeFalsy()
        expect(SenhaForte.isValida("S3nh4F0rt3%")).toBeTruthy()

    })
})