const connection = require('../database/connection'); //Arquivo que faz a conexão com banco de dados

module.exports = {
    async getIncidentsOfLoggedOng(request, response) {
        //Pegando o ID da ONG que está logada através do cabeçalho da requisição
        const ong_id = request.headers.authorization;
        
        //Pegando do BD todos incidents cadastrados pela ONG logada
        const incidents = await connection('incidents').where('ong_id', ong_id).select('*');

        //Retornando todos incidents
        return response.json(incidents);
    }
}