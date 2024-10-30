import { UsuarioFacade } from 'adapters'
import { ProvedorCriptografia, RepositorioUsuario } from 'core'
import { Express } from 'express'
import Error from '../utils/Error'
import ProvedorJWT from '../external/auth/ProvedorJWT'

export default class LoginUsuarioController {
    constructor(
        readonly server: Express,
        readonly repo: RepositorioUsuario,
        readonly crypto: ProvedorCriptografia,
        readonly jwt: ProvedorJWT
    ) {
        server.post('/login/', async (req, res) => {
            try {
                const { email, senha } = req.body
                const facade = new UsuarioFacade(repo, crypto)

                const usuario = await facade.login({ email, senha })
                const token = jwt.generate({
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    isAdmin: usuario.isAdmin
                })

                res.status(200).send(token)
            } catch (e: any) {
                res.status(400).send(Error.handle(e))
            }
        })
    }
}