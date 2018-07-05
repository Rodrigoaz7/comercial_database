//  Importando o módulo do express.
const express = require('express');

//  Importando o bodyParser.
const bodyParser = require('body-parser');

//  Importando o módulo express-session.
const expressSession = require('express-session');

//  Importando o módulo do express-validation.
const expressValidator = require('express-validator');

//  Importando o módulo do mongoose.
const mongoose = require('mongoose');
//  Conecta com o banco de dados e lida com problemas de conexão
mongoose.connect("mongodb://localhost:27017/db_comercial_eject");
mongoose.Promise = global.Promise; // → Queremos que o mongoose utilize promises ES6
mongoose.connection.on('error',err => {
	console.log(`🙅 🚫 → ${err.message}`);
});

require('../app/models/Usuarios');

//  Iniciando objeto do express.
const load = require('express-load');

//  Importando o módulo do path.
const path = require('path');

//  Importando o módulo do fs.
const fs = require('fs');

//Precisamos o module.exports para retornarmos qualquer modulo a outro lugar do projeto
var app = express();

//  Configurando o middleware do express.static.
app.use(express.static(path.join(__dirname, '../app/public/')));
//  Configurando o middleware do body-parser.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//  Configurando o middleware do express-session.
app.use(expressSession({
	secret: "chave",
	resave: false,
	saveUninitialized: false
}));

//  Configurando o middleware do express-validator.
app.use(expressValidator());

app.set('view engine', 'ejs');
app.set('views','./app/views/');

// Carregamento automatico com express-load
load('routes', {cwd : 'app'})
	.then('app/views')
	.then('app/models')
	.then('app/controller')
	.then('app/db')
	.into(app);

module.exports = app;
