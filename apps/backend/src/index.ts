import dotenv from 'dotenv'

dotenv.config()

import app from './external/api/config'
import RegistrarUsuarioControler from './adapters/RegistrarUsuarioController'

import RepositorioUsuarioPrisma from './external/db/RepositorioUSuarioPrisma'
import ProvedorCriptografiaBcrypt from './external/auth/ProvedorCriptografiaBcrypt'

const UsuarioRepo = new RepositorioUsuarioPrisma();
const provCrypto = new ProvedorCriptografiaBcrypt();

new RegistrarUsuarioControler(app, UsuarioRepo, provCrypto);