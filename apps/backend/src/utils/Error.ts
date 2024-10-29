export default class Error {
    static handle(e: any): any {
        if (e instanceof Array) return e
        if (e instanceof Error) {
            return [{ codigo: 'ERRO_DESCOHECIDO', message: e }]
        }

        return [{ codigo: 'ERRO_DESCONHECIDO' }]
    }
}