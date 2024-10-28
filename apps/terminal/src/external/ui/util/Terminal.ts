import { terminal } from "terminal-kit";
import { InputFieldOptions } from "terminal-kit/Terminal";

export default class Terminal {
    static titulo(titulo: string) {
        terminal.clear()
        terminal.bold.magenta(`${titulo}\n`)
        terminal.bold.magenta('-'.repeat(titulo.length))
    }

    static async requiredInput(label: string, opcoes?: InputFieldOptions): Promise<string> {
        terminal.gray(`\n${label}: `)

        const valor = await terminal.inputField(opcoes).promise
        if (valor?.trim()) return valor
        return Terminal.requiredInput(label, opcoes)
    }

    static async menu(titulo: string, opcoes: string[]): Promise<[number, string]> {
        Terminal.titulo(titulo)
        const resposta = await terminal.singleColumnMenu(opcoes).promise
        return [resposta.selectedIndex, resposta.selectedText]
    }

    static async sleep() {
        terminal.gray("\n\nPressione ENTER para continuar...")
        await terminal.inputField({ echo: false }).promise
    }

    static success(texto: string, novaLinha = true) {
        terminal.green(`${novaLinha ? '\n' : ''}${texto}`)
    }

    static error(texto: string, novaLinha = true) {
        terminal.red(`${novaLinha ? '\n' : ''}${texto}`)
    }
}