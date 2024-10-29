import { UsuarioFacade } from 'adapters'
import { ProvedorCriptografia, RepositorioUsuario } from 'core'
import { Express } from 'express'
import Error from '../utils/Error'

export default class RegistrarUsuarioControler {
    constructor(
        readonly server: Express,
        readonly repo: RepositorioUsuario,
        readonly crypto: ProvedorCriptografia
    ) {
        server.post('/usuario/', async (req, res) => {
            try {
                const { nome, email, senha } = req.body
                const facade = new UsuarioFacade(repo, crypto)

                await facade.registrar({ nome, email, senha })

                res.sendStatus(201)
            } catch (e: any) {
                res.status(400).send(Error.handle(e))
            }
        })
    }
}