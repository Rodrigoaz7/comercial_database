const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
require('./Usuarios');

const ProjectSchema = new Schema({ 
    nome: String, 
    descricao: String,
    empecilhos: String,
    data_inicio: String, //It's string because I don't need to make functions of it
    data_fim: String,	// avoid problems in the future
    preco: Number,
    id_cliente: SchemaTypes.ObjectId,
    dev_team: [{type: String}], //saving by email (because its unique)
    ativo: Boolean
});

mongoose.model('Projetos', ProjectSchema);