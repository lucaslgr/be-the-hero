const connection = require('../database/connection'); //Arquivo que faz a conexão com banco de dados

module.exports = {
    async login(request, response) {
        //Pegando o id da ong pelo body da requisição
        const ong_id = request.body.ong_id;

        //Verificando se existe alguma ONG no BD come esse ID
        const ong = await connection('ongs')
            .where('id', ong_id)
            .select('name')
            .first();
        
        //Verificando se a ONG está vazia, ou seja, se encontrou uma ONG no BD
        if(!ong){
            return response.status(400).json({error: 'No ONG found with this ID'});
        }

        //Retornando o name da ONG caso tenha sido encontrada no BD
        return response.json(ong);
    }
}