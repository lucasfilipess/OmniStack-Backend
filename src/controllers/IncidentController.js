const connection = require('../database/connection'); //conexão com o banco de dados

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count(); // conta minha quantidade de registros,[] ja que ele me retorna um objeto e eu so quero o 1 elemento então count[0] tambem funcionariaa
    // console.log(count);

    const incidents = await connection('incidents') //limito a minha pagia a 5 registros por vex
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //faz um join com a tabela de ongs para retornar os dados da ong cujo id é igual ao do incident
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]); //seleciona os campos do join com a tabela ongs para que sobrescrevam os do incidents

    response.header('X-Total-Count', count['count(*)']); //retorno o total de de registros para o meu header
    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });
    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;
    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id != ong_id) {
      return response.status(401).json({ error: 'Operation not permitted' });
    }

    await connection('incidents')
      .where('id', id)
      .delete();

    return response.status(204).send();
  }
};
