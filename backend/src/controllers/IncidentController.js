const connection = require('../database/connection'); //Arquivo que faz a conexão com banco de dados

module.exports = {
    //Action que retorna uma lista de todos incidents do BD de acordo com a paginação
    async getAll(request, response) {
        //Pegando a page que o cliente requisitou, se não foi enviado nada, o padrão é -> page=1
        const { page = 1} = request.query;

        //Pegando a quantidade de incidents cadastrados no BD
        const [count] = await connection('incidents').count();

        //Pegando todos incidentes de acordo com a paginação
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page-1) *5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        //Retornando no cabeçalho da RESPOSTA o total de incidents encontrados no BD
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    //Action que insere um incidente no BD
    async create(request, response){
        //Pegando os dados do incidente pelo front-end
        const{title, description, value} = request.body;
        
        //Pegando o ID da ONG que está logada através do cabeçalho da requisição
        const ong_id = request.headers.authorization;

        //Fazendo a inserção no banco de dados e pegando o ID gerado pelo banco de dados referente a essa inserção
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        //retornando para o front-end o ID da inserção 
        return response.json({id});
    },
    async delete(request, response) {
        //Pegando o id do incidente a ser deletado através de uma requisição delete
        const incident_id = request.params.id;
        //Pegando o id da ong que está logada através do cabeçalho.authorization da requisição
        const ong_id = request.headers.authorization;

        //Verificando se o INCIDENTE a ser deletado pertence de fato a ONG que está logada
        const incident = await connection('incidents')
            .where('id', incident_id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            //Mudando o http status code para 401 que remete a um Unauthorized
            return response.status(401).json({error : 'Opration not permitted.'}); 
        }

        //Fazendo a query sql que deleta o incident de acordo com o id captado
        await connection('incidents').where('id', incident_id).delete();

        //O http status code incida que a requisição não tem conteúdo na resposta
        return response.status(204).send();
    }
};