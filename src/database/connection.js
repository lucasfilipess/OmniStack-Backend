//conexão com banco de dados importa o knex, pass knexfile para configuration e passa configuration.development para connection e exporta connection
const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;
