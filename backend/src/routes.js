const express = require('express'); //Módulo para rota

/**Importando pacote para fazer validação dos nossos dados que compõe os nossos formulários usando o * * celebrate que faz a integração do nosso pacote express com o pacote de validação.
*/
const {celebrate, Joi, errors, Segments} = require ('celebrate');

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * <ORDEM DE PARÂMETROS no EXPRESS>
 * 1º: Rota
 * 2º: Validação (Celebrate)
 * 3º: Controler/Action 
 * 
 * -> O celebrate é passado no segundo parâmetro, ANTES da action da rota se definida, POIS se a validação no celebrate não for atendida, a action não será executada.
 * 
 * <VALIDAÇÂO NO CELEBRATE>
 * -> A validação no celebrate é feita indicando onde estão na requisição os dados que devem ser validados, se estou na QUERY, HEADERS, BODY, PARAMS ou COOKIES da requisição, que são os Segments do celebrate
*/

routes.post('/sessions', SessionController.login);

routes.get('/ongs', OngController.getAll);

routes.post(
    '/ongs',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required().min(10).max(11),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2),
        })
    }),
    OngController.create
);

routes.get(
    '/profile',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown()
    }),
    ProfileController.getIncidentsOfLoggedOng
);

routes.get(
    '/incidents',
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
        })
    }),
    IncidentsController.getAll);

routes.post(
    '/incidents',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            value: Joi.number().required(),
        }),
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown()
    }),
    IncidentsController.create);

routes.delete(
    '/incidents/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
    }),
    IncidentsController.delete);

module.exports = routes;