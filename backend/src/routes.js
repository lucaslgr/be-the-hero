const express = require('express'); //Módulo para rotas

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.login);

routes.get('/ongs', OngController.getAll);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentsController.getAll);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

routes.get('/profile', ProfileController.getIncidentsOfLoggedOng);

module.exports = routes;