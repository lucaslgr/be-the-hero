
//Pacte utilizado para fazer requisições de TESTE, análogo ao AXIOS, porém o SUPERTEST são incicados para requisições de test
const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach( async () => {
        //Fazendo a migrate para gerar o BD.sql de test
        await connection.migrate.rollback(); //Desfazendo todas migrations no bd de teste
        await connection.migrate.latest(); //Executa o comando -> npx knex migrate:latest
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name : "APAE",
            email : "con@teste.com.br",
            whatsapp : "32988094352",
            city : "Cataguases",
            uf : "MG"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    //Depois de todos os tests é destruido todas conexões
    afterAll(async () => {
        await connection.destroy();
    });
});