/**
 * Rota / Recurso
*/

/**
 * Métodos HTTP:
 * 
 * GET: Buscar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELTE: Deletar uma informação do back-end
 */


/**
  * Tipos de parâmetros:
  * 
  * Query: Parâmetros nomeados enviados na rota após "?" (Filtros, Paginação)
  * Route Params: Parâmetros utilizados para identificar recursos
  * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */


/**
 * SQL: Mysql, SQLite, PostgreeSQL, Oracle, MicrosoftSQL Server
 * NoSQL: MongoDB, CouchDB, etc
*/

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()
*/

const express = require('express'); //Importando modulo express para lidar com rotas
const {errors} = require('celebrate'); //Importando pacote de error para tratar os error lançados na validação de dados feita pelo celebrate 
const routes = require('./routes'); //Importando as routes configuradas
const cors = require('cors'); //Importando modulo de segurança CORS

const app = express();

app.use(cors());
//Informando para o Express que ele poderá receber respostas das resquisições no formato json
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(3333);