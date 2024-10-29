import bcrypt from 'bcrypt';
import { ProvedorCriptografia } from "core";


export default class ProvedorCriptografiaBcrypt implements ProvedorCriptografia {
    encrypt(valor: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(valor, salt);
    }
    compare(valor: string, valorCriptografado: string): boolean {
        return bcrypt.compareSync(valor, valorCriptografado);
    }
}