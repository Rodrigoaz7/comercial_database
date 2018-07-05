const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const CargoSchema = new Schema({ 
    nome: String
});

mongoose.model('Cargos', CargoSchema);