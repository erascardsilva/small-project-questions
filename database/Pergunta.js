const Sequelise = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('pergunta',{
    titulo: {
        type : Sequelise.STRING,
        allowNull: false,},
            
    descricao: {
        type: Sequelise.TEXT,
        allowNull: false,
    }
});

Pergunta.sync({force : false}).then(() => {
        console.log("Tabela Gravado");    
}
)

module.exports = Pergunta;