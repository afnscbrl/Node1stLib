import chalk from 'chalk'
import fs from 'fs'

function extraiLinks(texto) {
    const regex = /(https?:\/\/[^$#\s]*)>\s([\S]*)<\/a/gm
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

async function pegaArquivo(caminhoArquivo) {
    const encoding = 'utf-8'
    try {
    const texto = await fs.promises.readFile(caminhoArquivo, encoding)
    return extraiLinks(texto)
    } catch(err) {
        trataErro(err)
    }
}

// function pegaArquivo(caminhoArquivo) {
//     const enconding = 'utf-8'
//     fs.promises
//     .readFile(caminhoArquivo, enconding)
//     .then((texto) => console.log(chalk.green(texto)))
//     .catch((err) => trataErro(err))
// }

// function pegaArquivo(caminhoArquivo) {
//     const enconding = 'utf-8'
//     fs.readFile(caminhoArquivo, enconding, (err, texto) =>{
//         if (err) {
//             trataErro(err)
//         }
//         console.log(chalk.green(texto))
//     })
// }

//pegaArquivo('./arquivo/texto1.md')
 export const leArquivo = pegaArquivo
