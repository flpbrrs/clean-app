import dotenv from 'dotenv'

dotenv.config()

import app from './external/api/config'
import RegistrarUsuarioControler from './adapters/RegistrarUsuarioController'

import RepositorioUsuarioPrisma from './external/db/RepositorioUSuarioPrisma'
import ProvedorCriptografiaBcrypt from './external/auth/ProvedorCriptografiaBcrypt'
import ProvedorJWT from './external/auth/ProvedorJWT'
import LoginUsuarioController from './adapters/LoginUsuarioController'

const usuarioRepo = new RepositorioUsuarioPrisma();
const provCrypto = new ProvedorCriptografiaBcrypt();
const jwt = new ProvedorJWT(process.env.JWT_SECRET!);

new RegistrarUsuarioControler(app, usuarioRepo, provCrypto);
new LoginUsuarioController(app, usuarioRepo, provCrypto, jwt);
