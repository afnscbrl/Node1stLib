import {leArquivo} from './index.js'
import chalk from 'chalk'

const caminho = process.argv

//console.log(caminho)

async function processaTexto(caminhoDeArquivo) {
    const resultado = await leArquivo(caminhoDeArquivo[2])
    console.log(chalk.yellow('lista de links'), resultado)
}

processaTexto(caminho)

