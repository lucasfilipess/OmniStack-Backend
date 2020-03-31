const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();
const OngController = require('./controllers/OngControllers');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//a função deve ser assíncrona já que eu preciso esperar os dados serem salvos no banco para retornar ao usuário


routes.get('/ongs', OngController.index);


routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), OngController.create); //celebrate deve vir antes para validar os dados antes da criação da ong são os middlewares do express


routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown() // não estou verificando todos os headers por isso o unknown
}), ProfileController.index);


routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown() // não estou verificando todos os headers por isso o unknown
}), IncidentController.delete);


routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), IncidentController.index);


routes.post('/sessions', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown()
}), SessionController.create);



routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number()
  })
}), IncidentController.create);







module.exports = routes;


// celebrate({
//   [Segments.HEADERS]: Joi.object({
//     Authorization: Joi.string().required(),
//   }).unknown()
// }),