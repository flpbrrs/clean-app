import { UsuarioDTO } from "adapters";
import { jwtDecode } from "jwt-decode";

export default class Sessao {
    private static _usuario: UsuarioDTO | null = null

    static start(token: string) {
        this._usuario = jwtDecode(token) as UsuarioDTO
    }

    static finish() {
        this._usuario = null
    }

    static get usuario(): UsuarioDTO | null {
        return Sessao._usuario;
    }
}