import Usuario from "../model/Usuario";

export default interface RepositorioUsuario {
    save(usuario: Usuario): Promise<Usuario>
    findByEmail(email: string): Promise<Usuario | null>
}