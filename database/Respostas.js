const Sequelise = require("sequelize");
const connection = require("./database");

const Respostas = connection.define("resposta",{
    corpo: { 
        type : Sequelise.TEXT,
        allowNull : false
    },
    perguntaID: {
        type: Sequelise.INTEGER,
        allowNull: false
    }
 });
    Respostas.sync({force: false}).then(() => {
        console.log("Tabela Resp Gravado");    
});

    module.exports = Respostas;