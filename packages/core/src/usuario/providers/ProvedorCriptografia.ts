export default interface ProvedorCriptografia {
    encrypt(valor: string): string
    compare(valor: string, valorCriptografado: string): boolean
}