import Entidade, { EntidadeProps } from "../../src/shared/Entidade";
import Id from "../../src/shared/Id";

interface EntidadeTesteProps extends EntidadeProps {
    nome?: string,
    idade?: number
}

class EntidadeTeste extends Entidade<EntidadeTeste, EntidadeTesteProps> {
    constructor(props: EntidadeTesteProps) {
        super(props)
    }
}

describe("Entidade", () => {
    test("Deve validar a igualdade em entidades com o mesmo id", () => {
        const id = Id.gerar.valor;
        const e1 = new EntidadeTeste({ id })
        const e2 = new EntidadeTeste({ id })

        expect(e1.equals(e2)).toBeTruthy();
    })

    test("Deve indicar diferença nas entidades com ids diferentes", () => {
        const id1 = Id.gerar.valor;
        const id2 = Id.gerar.valor;
        const e1 = new EntidadeTeste({ id: id1 })
        const e2 = new EntidadeTeste({ id: id2 })

        expect(e1.equals(e2)).toBeFalsy();
    })

    test("Deve clonar corretamente uma entidade", () => {
        const e1 = new EntidadeTeste({ nome: "Felipe", idade: 25 });
        const e2 = e1.clone({ idade: 30 })

        expect(e1.id.equals(e2.id)).toBeTruthy()
        expect(e1.props.nome).toBe(e2.props.nome)
        expect(e2.props.idade).toBe(30)
    })
})