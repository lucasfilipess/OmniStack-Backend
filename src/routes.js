const express = require('express');
const crypto = require('crypto'); // Biblioteca do próprio nodejs para criptografia que sera usada para gerar o id
const routes = express.Router();
const OngController = require('./controllers/OngControllers');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//a função deve ser assíncrona já que eu preciso esperar os dados serem salvos no banco para retornar ao usuário

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.post('/sessions', SessionController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes;
