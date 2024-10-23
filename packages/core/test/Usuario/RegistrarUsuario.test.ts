import RegistrarUsuario from "../../src/usuario/services/RegistrarUsuario";
import ProvedorCriptografiaMock from "../mock/ProvedorCriptografiaMock";
import RepositorioUsuarioMock from "../mock/RepositorioUsuarioMock"
import Teste from "../utils/Teste";

describe('Caso de uso: Registrar Usuário', () => {
    test("Deve cadastrar um usuário", async () => {
        const repo = new RepositorioUsuarioMock();
        const casoDeUso = new RegistrarUsuario(repo, new ProvedorCriptografiaMock())

        await casoDeUso.executar({
            nome: "Felipe Jonathan",
            email: "felipe@fmail.com",
            senha: "!Senha123"
        })

        expect(repo.findByEmail("felipe@fmail.com")).toBeDefined()
    })

    test('Deve gerar erro com atributos inválidos', async () => {
        const repo = new RepositorioUsuarioMock();
        const casoDeUso = new RegistrarUsuario(repo, new ProvedorCriptografiaMock())

        Teste.comErroSync(
            () => casoDeUso.executar({
                nome: "Felipe",
                email: "felipe@fmail.com",
                senha: "!Senha123"
            }),
            {
                codigo: "SOBRENOME_INVÁLIDO"
            }
        )
    })
})