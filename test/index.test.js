import pegaArquivo from '../index'

const arrayResult = [
    {
        FileList: 'https://www'
    }
]

describe('pegaArquivo::', () => {
    it('deve ser uma função', () => {
        expect(typeof pegaArquivo).toBe('function')
    })
    it('deve retornar array com resultados', async () => {
        const result = await pegaArquivo('/home/afnscbrl/Documents/Node1stLib/arquivo/texto1.md')
        expect(result).toEqual(arrayResult)
    })
    it('deve retornar mensagem "não a links"', async()=> {
        const result = await pegaArquivo('/home/afnscbrl/Documents/Node1stLib/arquivo/texto1.md')
        expect(result).toBe('não há links')
    })
})

