import { v4 as uuid } from "uuid"
import Validador from "./Validador";

export default class Id {
    readonly valor: string;

    constructor(valor?: string, atributo?: string, objeto?: string) {
        this.valor = valor ?? uuid();

        Validador.validar(this.valor, atributo, objeto).isUuid().lancarSeErro();
    }

    static get gerar(): Id {
        return new Id()
    }

    equals(id: Id): boolean {
        return this.valor === id.valor
    }
}