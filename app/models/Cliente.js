const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const ClientSchema = new Schema({ 
    nome: String, 
    email: String,
    telefone: String,
    esta_em_dia: Boolean,
    ramo: String,
    cpf_ou_cnpj: {
    	type: String,
    	unique: true,
    	required: true
    },
    tipo_pessoa: Number, //0 para pessoa fisica e 1 para juridica
    id_membro: String //e-mail como id
});

mongoose.model('Cliente', ClientSchema);