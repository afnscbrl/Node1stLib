import chalk from 'chalk'
import fs from 'fs'

function extraiLinks(texto) {
    const regex = /(https?:\/\/[^$#\s]*[\w])">\s([\S]*)<\/a/gm
    const arrayResultados = []
    let temp
    while ((temp = regex.exec(texto))!== null) {
        arrayResultados.push({[temp[2]]: temp[1]})
    }
    return arrayResultados.length === 0 ? 'Não ha links' : arrayResultados
}


function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Algo deu ruim!'))
}

export default async function pegaArquivo(caminhoArquivo) {
    const encoding = 'utf-8'
    try {
    const texto = await fs.promises.readFile(caminhoArquivo, encoding)
    return extraiLinks(texto)
    } catch(err) {
        trataErro(err)
    }
}

