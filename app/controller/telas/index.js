const mongoose = require('mongoose');

require('./../../models/Cliente');
require('./../../models/Usuarios');
require('./../../models/Projeto');
require('./../../models/Cargo');

const Usuario = mongoose.model("Usuarios");
const Cliente = mongoose.model("Cliente");
const Projeto = mongoose.model("Projetos");
const Cargo = mongoose.model("Cargos");

exports.home = async (application, req, res) => {
    return req.session;
}

exports.all_users = async (application, req, res) => {
	const users = await Usuario.find();
	return users;
}

exports.all_clientes = async (application, req, res) => {
	var clientes = await Cliente.find();
	return clientes;
}

exports.all_projects = async (application, req, res) => {
	const projetos = await Projeto.find();
	return projetos;
}

// Filtros de clientes
exports.clientes = async (application, req, res, filters) => {
	var clientes = [];
	var aux_pagamento = "";
	var aux_pessoa = "";

	if(filters.pessoa && filters.pagamento) {
		if(filters.pagamento == "Devendo") aux_pagamento = false;
		else aux_pagamento = true;
		if(filters.pessoa == "Física") aux_pessoa = 0;
		else aux_pessoa = 1;

		clientes = await Cliente.find({tipo_pessoa: aux_pessoa, esta_em_dia: aux_pagamento});
		return res.status(200).json({clientes: clientes});
	}
	else if(filters.pessoa) {
		console.log(filters.pessoa);
		if(filters.pessoa == "Física") aux_pessoa = 0;
		else aux_pessoa = 1;

		clientes = await Cliente.find({tipo_pessoa: Number(aux_pessoa)});
		return res.status(200).json({clientes: clientes});
	}
	else if(filters.pagamento) {
		if(filters.pagamento == "Devendo") aux_pagamento = false;
		else aux_pagamento = true;
		clientes = await Cliente.find({esta_em_dia: aux_pagamento});
		return res.status(200).json({clientes: clientes});
	}
}

exports.projetos_filter = async (application, req, res, filters) => {
	var projetos = [];
	
	if(filters.rodando) {
		if(filters.rodando == "Ativo") {
			projetos = await Projeto.find({ativo: true});
		}
		else if(filters.rodando == "Inativo"){
			projetos = await Projeto.find({ativo: false});
		}
		else {
			projetos = await Projeto.find();
		}
	} 
	return res.status(200).json({projetos: projetos});
}

exports.cliente_detail = async (application, req, res, id_cliente) => {
	
 	const resultado = await Cliente.findById(id_cliente, function(err, res){
 		if(err) return res.status(500).json({erros:err});
 		return res;
 	});
 	return resultado;
}

exports.projeto_detail = async (application, req, res, id) => {
	
 	const resultado = await Projeto.findById(id, function(err, res){
 		if(err) return res.status(500).json({erros:err});
 		return res;
 	});
 	return resultado;
}

exports.myClients = async (application, req, res, id) => {
	
 	const resultado = await Cliente.find({id_membro: id}, function(err, res){
 		if(err) return res.status(500).json({erros:err});
 		return res;
 	});
 	return resultado;
}

exports.MyData = async (application, req, res, email4search) => {
	
 	const resultado = await Usuario.findOne({email: email4search}, function(err, res){
 		if(err) return res.status(500).json({erros:err});
 		return res;
 	});
 	return resultado;
}

exports.myprojects = async (application, req, res, email4search) => {

	const resultado = await Projeto.find({dev_team: email4search}, function(err, res){
 		if(err) return res.status(500).json({erros:err});
 		return res;
 	});
 	return resultado;
}

exports.Cargos = async (application, req, res, email4search) => {
	
 	const resultado = await Cargo.find(function(err, res){
 		if(err) return res.status(500).json({erros:err});
 		return res;
 	});
 	return resultado;
}
