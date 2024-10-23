import ProvedorCriptografia from "../../src/usuario/providers/ProvedorCriptografia";

export default class ProvedorCriptografiaMock implements ProvedorCriptografia {
    encrypt(_: string): string {
        return '$2a$12$Udf9h/n.hayLbxBzommPcepVymDDnDJ1eKFqNDtCoMXCdNiivN1m.';
    }
    compare(valor: string, _: string): boolean {
        return valor === '!Senha123'
    }
}