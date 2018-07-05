// Teste de usuario logado
exports.UserLogged = (req,res, next) =>{
    if (!req.session.loggedUser) {
        res.redirect('/');
        return;
    }
    return next();
}

// Teste se existe um usuario logado e se ele tem permissoes de diretor
exports.UserDiretorLogged = (req,res, next) =>{
    if (!req.session.loggedUser || !req.session.diretor) {
        res.redirect('/');
        return;
    }
    return next();
}

//Nao permite que usuarios ja logados acessem pagina de login
exports.AlreadyLogged = (req,res, next) =>{
    if (req.session.loggedUser) {
        res.redirect('/');
        return;
    }
    return next();
}