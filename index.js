const express = require("express");
const app = express();
const bodyParsed = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Respostas = require("./database/Respostas");

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
    Pergunta.findAll({raw: true , order:[
        ["id" , "DESC"]
    ]}).then(perguntas =>{
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

app.get("/verpergunta/:id", (req,res) =>{
    let idperg = req.params.id;
    Pergunta.findOne({
        where: { id : idperg }
    }).then(pergunta => {
        
        if (pergunta != undefined){
            Respostas.findAll({
                where: {perguntaID : idperg }
            }).then(resposta =>{
                res.render("perguntaresp",{
                    pergunta : pergunta,
                    resposta: resposta
                });
            });


           
        }else{
            res.redirect("/");
        }
    })
});

app.post("/resposta", (req,res) =>{
    let corpo = req.body.corporesposta;
    let perguntaID = req.body.perguntaid;
    
    Respostas.create({
        corpo : corpo,
        perguntaID: perguntaID
    }).then(()=>{
        res.redirect('/verpergunta/'+perguntaID);
   

    });
});


app.listen(3000, () => { console.log("conectado acesse http://localhost:3000"); });