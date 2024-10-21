import Email from "../../src/shared/Email"
import Teste from "../utils/Teste"

describe("Email", () => {
    test("Deve criar um email válido", () => {
        const email = new Email("fulano@zmail.com")
        expect(email.valor).toBe("fulano@zmail.com")
    })

    test("Deve retornar o nome do usuário", () => {
        const email = new Email("fulano@zmail.com")
        expect(email.usuario).toBe("fulano")
    })

    test("Deve retornar o domínio", () => {
        const email = new Email("fulano@zmail.com")
        expect(email.dominio).toBe("zmail.com")
    })

    test("Deve validar email", () => {
        expect(Email.isValido("usuario@email.com")).toBeTruthy()
        expect(Email.isValido("usuario")).toBeFalsy()
    })

    test("Deve lançar erro ao criar um email inválido", () => {
        Teste.comErro(() => new Email(), { codigo: "EMAIL_INVALIDO" })
        Teste.comErro(() => new Email(""), { codigo: "EMAIL_INVALIDO" })
        Teste.comErro(() => new Email("fulano"), { codigo: "EMAIL_INVALIDO" })
    })
})