import Id from "../../src/shared/Id"
import Teste from "../utils/Teste"

describe('Id', () => {
    test("Deve criar um novo id válido", () => {
        const id = Id.gerar
        expect(id.valor).toHaveLength(36)
    })

    test("Deve lançar um erro ao tentar criar um id inválido", () => {
        Teste.comErro(() => new Id('123', 'valor', "ID"), { codigo: 'ID_INVÁLIDO' })
    })

    test("Deve criar um id válido a partir de um id existente", () => {
        const idBase = Id.gerar.valor;
        const id = new Id(idBase);

        expect(id.valor).toHaveLength(36);
        expect(id.valor).toBe(idBase);
    })

    test("Deve comparar corretamente 2 id", () => {
        const id1 = Id.gerar;
        const id2 = new Id(id1.valor);

        expect(id1.equals(id2)).toBeTruthy();
        expect(id2.equals(id1)).toBeTruthy();
    })
})