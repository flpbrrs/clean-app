import NomePessoa from "../../src/shared/NomePessoa"
import Teste from "../utils/Teste"

describe("Nome Pessoa", () => {
    test('Deve criar corretamente um nome válido', () => {
        const nome = new NomePessoa("Felipe Jonathan Barros de Oliveira")

        expect(nome.completo).toBe("Felipe Jonathan Barros de Oliveira")
        expect(nome.primeiroNome).toBe("Felipe")
        expect(nome.sobrenomes.length).toBe(4)
    })

    test('Deve gerar erro ao tentar criar um nome vazio', () => {
        Teste.comErro(
            () => new NomePessoa(""),
            { codigo: "VAZIO" }
        )
    })
})