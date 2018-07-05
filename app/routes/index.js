const index = require('../controller/telas/index');
const block_route = require('../controller/autenticacao_telas/block');

module.exports = application => {
  	application.get('/', async (req, res) => {
  		const sessao = await index.home(application, req, res);
    	res.render('index', {loggedUser: sessao.loggedUser, data: sessao, pagina: "inicio"});
	});

	application.get('/perfil', block_route.UserLogged, async (req, res) => {
  		const sessao = await index.home(application, req, res);
      const myprojects = await index.myprojects(application, req, res, sessao.email);
      const myclients = await index.myClients(application, req, res, sessao.email);
      const data_from_member = await index.MyData(application, req, res, sessao.email);

      var money = 0;
      for(var i=0; i<myprojects.length; i++){
        money += myprojects[i].preco;
      }

    	res.render('perfil', {loggedUser: sessao.loggedUser, data: sessao, pagina: "perfil", 
        projetos: myprojects, clientes: myclients, meus_dados: data_from_member, dinheiro4me: money});
	});

	application.get('/projetos', block_route.UserLogged, async (req, res) => {
  		const sessao = await index.home(application, req, res);

      if(req.query.id){
        const dados_projeto = await index.projeto_detail(application, req, res, req.query.id);
        res.render('projetos_detail', {loggedUser: sessao.loggedUser, data: sessao, projeto: dados_projeto});
      } else if(req.query.rodando){
        index.projetos_filter(application,req,res,req.query);
      } else {
        const all_projects = await index.all_projects(application, req, res);
        res.render('projetos', {loggedUser: sessao.loggedUser, data: sessao, projetos: all_projects});
      }
	});

  application.get('/clientes', block_route.UserLogged, async (req, res) => {
    const sessao = await index.home(application, req, res);

    if(req.query.id){
      const dados_cliente = await index.cliente_detail(application, req, res, req.query.id);
      res.render('clientes_detail', {loggedUser: sessao.loggedUser, data: sessao, cliente: dados_cliente});
    } else if(req.query.pagamento || req.query.pessoa) {
      index.clientes(application,req,res,req.query);
    } else {
      const all_clients = await index.all_clientes(application, req, res);
      res.render('clientes', {loggedUser: sessao.loggedUser, data: sessao, clientes: all_clients});
    }
  });
}