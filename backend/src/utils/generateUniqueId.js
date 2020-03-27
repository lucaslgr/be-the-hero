const crypto = require('crypto'); //Módulo para gerar hash code de ID aleatório para ONG

module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');
}