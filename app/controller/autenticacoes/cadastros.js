const mongoose = require('mongoose');
const crypto = require('crypto');
// const fs = require('fs');
// var multer = require('multer');


require('./../../models/Cliente');
require('./../../models/Usuarios');
require('./../../models/Projeto');

var Usuario = mongoose.model("Usuarios");
const Cliente = mongoose.model("Cliente");
const Projeto = mongoose.model("Projetos");


exports.cadastroUser = (application, req, res, next) => {

    req.assert('nome', 'O seu nome não pode ser vazio').notEmpty();
    req.assert('email', 'O seu e-mail não pode ser vazio.').notEmpty();
    req.assert('senha', 'A senha não pode ser vazia.').notEmpty();
    //console.log(req.files);

    const erros = req.validationErrors();
    if(erros){
        res.status(400).json({erros:erros});
        return;
    }

    const buscaUsuarios = Usuario.find({email:req.body.email}, function(err, user) {
        if(user.length > 0){
            const erroUsuario = [{msg: "Usuário já cadastrado com esse email."}];
            return res.status(400).json({ erros: erroUsuario});
        } else {
            var diretorio_imagens = "";

            const senhaCriptogafada = crypto.createHash("md5").update(req.body.senha).digest("hex");
            req.body.senha = senhaCriptogafada;
            req.body.isAtivo = true;

            const novoUsuario = new Usuario(req.body);

            //Without profile photo for now...
            novoUsuario.img = "default.png";

            novoUsuario.save();

            return res.status(200).json({ sucesso: true, msg: "Usuário criado com sucesso." });
        }
    });
}

exports.updateMembro = (application, req, res, id) => {
    Usuario.findOne({email: req.body.email}, (err, todo) => {
        if (err) return res.status(500).send(err);
        todo.nome = req.body.nome;
        todo.email = req.body.email;
        todo.save();
        const response = {
            message: "Usuário atualizado com sucesso"
        };
        return res.status(200).send(response);
    });
    //console.log("UPDATE => ID=" + id + "  "  + req.body);
    // Usuario.findByIdAndUpdate(id, req.body, (err, todo) => {  
    //     if (err) return res.status(500).send(err);
    //     const response = {
    //         message: "Cliente atualizado com sucesso"
    //     };
    //     return res.status(200).send(response);
    // });
}

exports.cadastroCliente = (application, req, res, next) => {
    req.assert('nome', 'O seu nome não pode ser vazio').notEmpty();
    req.assert('email', 'O seu e-mail não pode ser vazio.').notEmpty();
    req.assert('telefone', 'O telefone não pode ser vazia.').notEmpty();
    req.assert('tipo_pessoa', 'O telefone não pode ser vazia.').notEmpty();
    req.assert('cpf_ou_cnpj', 'O telefone não pode ser vazia.').notEmpty();

    const erros = req.validationErrors();
    if(erros){
        res.status(400).json({erros:erros});
        return;
    }
    // lembrar de salvar cpf/cnpj sempre sem pontuacao !!
    Cliente.find({cpf_ou_cnpj:req.body.cpf_ou_cnpj}, function(err, user) {
        if(user.length > 0){
            const erroUsuario = [{msg: "Cliente já foi cadastrado anteriormente."}];
            return res.status(400).json({ erros: erroUsuario});
        } else {

            var novoCliente = new Cliente(req.body);
            novoCliente.id_membro = req.session.email;
            novoCliente.save();

            return res.status(200).json({ sucesso: true, msg: "Cliente cadastrado com sucesso." });
        }
    });
}

exports.removerCliente = (application, req, res, id_cliente) => {
    Cliente.findByIdAndRemove(id_cliente, (err, todo) => {  
        if (err) return res.status(500).send(err);
        const response = {
            message: "Cliente deletado com sucesso"
        };
        return res.status(200).send(response);
    });
}

exports.updateCliente = (application, req, res, id_cliente) => {
    Cliente.findByIdAndUpdate(id_cliente, req.body, (err, todo) => {  
        if (err) return res.status(500).send(err);
        const response = {
            message: "Cliente atualizado com sucesso"
        };
        return res.status(200).send(response);
    });
}

exports.cadastroProjeto = (application, req, res, next) => {
    req.assert('nome', 'O seu nome não pode ser vazio').notEmpty();
    req.assert('ativo', 'O campo de ativo não pode ser vazio.').notEmpty();
    req.assert('preco', 'O preço não pode ser vazio.').notEmpty();

    const erros = req.validationErrors();
    if(erros){
        res.status(400).json({erros:erros});
        return;
    }

    console.log(req.body);
    req.body.preco = parseFloat(req.body.preco);
    var novoProjeto = new Projeto(req.body);
    novoProjeto.save();
    // for(var i=0; i<req.body.membros.length; i++){
    // 	novoProjeto.dev_team.push(req.body.membros[i]);
    // }
    // novoProjeto.save();

    return res.status(200).json({ sucesso: true, msg: "Projeto cadastrado com sucesso." });
}

exports.removerProjeto = (application, req, res, id) => {
    Projeto.findByIdAndRemove(id, (err, todo) => {  
        if (err) return res.status(500).send(err);
        const response = {
            message: "Projeto deletado com sucesso"
        };
        return res.status(200).send(response);
    });
}

exports.updateProjeto = (application, req, res, id) => {
    Projeto.findByIdAndUpdate(id, req.body, (err, todo) => {  
        if (err) return res.status(500).send(err);
        const response = {
            message: "Projeto atualizado com sucesso"
        };
        return res.status(200).send(response);
    });
}

exports.realizarLogin = (application, req, res) => {

    req.assert('email', 'O seu e-mail não pode ser vazio.').notEmpty();
    req.assert('senha', 'A senha não pode ser vazia.').notEmpty();
    const erros = req.validationErrors();
    if (erros) {
        res.status(500).json({ erros: erros });
        return;
    }
    const senhaCriptogafada = crypto.createHash("md5").update(req.body.senha).digest("hex");
    req.body.senha = senhaCriptogafada;
    const {email} = req.body;
    const {senha} = req.body;
    const buscaUsuarios = Usuario.findOne({email:email, senha:req.body.senha}, function(err, user) {
        if(err){
            return res.status(500).json({erros:err});
        } else if(user == null){
            console.log("usuario nao existe  < < < ******");
            const erroUsuario = [{ status: false, msg: "Usuário ou senha inválidos" }];
            return res.status(500).json({erros:erroUsuario});
        } else if(!user.isAtivo){
            const erroUsuario = [{ status: false, msg: "Usuário não está mais ativo" }];
            return res.status(500).json({erros:erroUsuario});
        } else {
            req.session.loggedUser = true;
            req.session.nome = user.nome;
            req.session.email = user.email;
            req.session.diretor = user.isDiretor;
            req.session.img = "uploads/profile_pics/" + user.img;
            req.session.id = user._id;
            return res.status(200).json({ status: true, tipo: "usuarios", msg: "Login autorizado" });
        }
    });
};

exports.sair = (application, req, res) => {
    req.session.destroy( err => {
        res.redirect('/');
    });
};


