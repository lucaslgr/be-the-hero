const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection'); //Arquivo que faz a conexão com banco de dados

module.exports = {
    //Action list
    async getAll(request, response){
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },
    //Action create
    async create(request, response){
        //Pegando os dadoss enviados do front-end
        const {name, email, whatsapp, city, uf} = request.body;
    
        //Gerando um ID para a ong
        const id = generateUniqueId(); //4 bytes de caracteres hexadecimais

        //Salvando no BD
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        
        //Retornando o ID gerado da ONG
        return response.json({ id });
    }
};