
const index = require('../controller/telas/index');
const autenticacao = require('../controller/autenticacoes/cadastros');
const block = require('../controller/autenticacao_telas/block');


module.exports = application => {

    // ----------------------- MEMBERS --------------------------------
    application.post('/cadastro-membro', (req, res) => {
        autenticacao.cadastroUser(application, req, res);
    });
    application.get('/cadastro-membro', async (req, res) => { 
        const all_cargos = await index.Cargos(application, req, res); 
        res.render('cadastro_membros', {cargos: all_cargos});
    });
    application.put('/perfil', block.UserLogged, async (req, res) => {
        autenticacao.updateMembro(application, req, res, req.query.id);
    });
    // ----------------------- END OF MEMBERS --------------------------------

    // ----------------------- CLIENTS --------------------------------
    application.post('/cadastro-cliente', block.UserLogged, (req, res) => {
        autenticacao.cadastroCliente(application, req, res);
    });
    application.get('/cadastro-cliente', block.UserLogged, async (req, res) => {
        const sessao = await index.home(application, req, res);
        res.render('cadastroclientes', {loggedUser: sessao.loggedUser, data: sessao});
    });
    application.delete('/deletar-cliente', block.UserLogged, (req, res) => {
        autenticacao.cadastroCliente(application, req, res);
    });
    application.put('/clientes', block.UserLogged, async (req, res) => {
        autenticacao.updateCliente(application, req, res, req.query.id);
    });
    application.delete('/clientes', block.UserLogged, async (req, res) => {
        autenticacao.removerCliente(application, req, res, req.query.id);
    });
    // ----------------------- END OF CLIENTS --------------------------------

    // ----------------------- PROJECTS --------------------------------
    application.get('/cadastro-projeto', block.UserLogged, async (req, res) => {
        const sessao = await index.home(application, req, res);
        const all_clients = await index.all_clientes(application, req, res);
        const all_users = await index.all_users(application, req, res);
        res.render('cadastroprojetos', {loggedUser: sessao.loggedUser, data: sessao, 
            clientes: all_clients, membros: all_users});
    });
    application.post('/cadastro-projeto', block.UserLogged, (req, res) => {
        autenticacao.cadastroProjeto(application, req, res);
    });
    application.put('/projetos', block.UserLogged, (req, res) => {
        autenticacao.updateProjeto(application, req, res, req.query.id);
    });
    application.delete('/projetos', block.UserLogged, (req, res) => {
        autenticacao.removerProjeto(application, req, res, req.query.id);
    });
    // --------------------- END OF PROJECTS ---------------------------

    application.post('/login', block.AlreadyLogged, (req, res) => {
        autenticacao.realizarLogin(application, req, res);
    });
    application.get('/login', block.AlreadyLogged, (req, res) => {
        res.render('login');
    });
    application.get('/sair', (req, res) => {
        autenticacao.sair(application, req, res);
    });
};