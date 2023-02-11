const express = require("express");
const app = express();
const bodyParsed = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

connection
    .authenticate()
    .then(() => {
        console.log("Conectado ao banco de daods !!")
    })
    .catch(() => {
        console.log("Erro não conectado com banco")
    })

//express
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
//body parsed
app.use(bodyParsed.urlencoded({ extended: false }));
app.use(bodyParsed.json());

//Rotas
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/perguntar", (req,res) => {
    res.render("perguntar");
});

app.get("/verpergunta", (req,res) =>{
    Pergunta.findAll({raw: true}).then(perguntas =>{
        res.render("verpergunta",{ 
                perguntas : perguntas
            })})
});

app.get('/sobre', (req,res)=>{
    res.render("sobre");
}  )

app.post("/perguntar", (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
         res.redirect('/');
    });
});

app.listen(3000, () => { console.log("conectado acesse http://localhost:3000"); });