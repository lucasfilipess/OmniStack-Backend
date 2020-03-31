const crypto = require('crypto'); // Biblioteca do próprio nodejs para criptografia que sera usada para gerar o id


module.exports = function generateUniqueId() {
  return crypto.randomBytes(4).toString('HEX');
}
