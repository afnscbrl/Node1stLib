import fetch from "node-fetch"

function lidarErros(err) {
    throw new Error(err.message)
}

async function checaStatus(arrayURLs) {
    try {
        const arrayStatus = await Promise
            .all(arrayURLs
                .map(async url => {
                    const res = await fetch(url)
                    return res.status
        }))
        return arrayStatus
    } catch(err) {
        lidarErros(err)
    }
}

export default async function validaURLs(arrayLinks) {
    const links = geraArrayDeURLs(arrayLinks)
    const statusLinks = await checaStatus(links)
    const resultados = arrayLinks
        .map((obj, ind) => ({
            ...obj, status: statusLinks[ind]
    }))
    return resultados
}

function geraArrayDeURLs(arrayLinks) {
    return arrayLinks.map(x => Object
        .values(x).join())
}