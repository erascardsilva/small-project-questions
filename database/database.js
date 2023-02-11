const sequelise = require('sequelize');
const connection = new sequelise('guiaperguntas', 'erasmo', '3727', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
