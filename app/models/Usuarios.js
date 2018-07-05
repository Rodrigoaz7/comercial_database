const mongoose  = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({ 
    nome: String, 
    email: {
    	type: String,
    	unique: true,
    	required: true
    },
    isDiretor: Boolean,
    isAtivo: Boolean,
    senha: String ,
    img: String,
    cargo: String
});

// //hashing a password before saving it to the database
// UserSchema.pre('save', function (next) {
// 	var user = this;
// 	console.log(user.senha);
// 	if(user.senha == undefined) {
// 		user.senha = "senha123";
// 	}
// 	console.log(user.senha);
// 	const senhaCriptogafada = crypto.createHash("md5").update(user.senha).digest("hex");
// 	user.senha = senhaCriptogafada;
// });

module.exports = mongoose.model('Usuarios', UserSchema);

