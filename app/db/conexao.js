var mongoose = require('mongoose');

function criarConexao(){
	mongoose.connect('mongodb://localhost:27017/db_comercial_eject');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log(" *** Mongoose conectado com sucesso !!! ");
	});
}

//wrapper (para nao haver conexoes desnecessarias)
module.exports = function(){
	return criarConexao;
}