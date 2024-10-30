import jwt from 'jsonwebtoken'

export default class ProvedorJWT {
    constructor(private secret: string) { }

    generate(payload: string | object): string {
        return jwt.sign(payload, this.secret, { expiresIn: '15d' })
    }

    validate(token: string): string | object {
        return jwt.verify(token, this.secret)
    }
}