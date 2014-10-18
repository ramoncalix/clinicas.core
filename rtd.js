var error = require("./libs/error.js");
var itg = require("./libs/integridad.js");
var usuarios = require("./usuarios/usuarios.js");
var expedientes = require("./expedientes/expedientes.js");
var facturacion = require("./facturacion/facturacion.js");
var inventario = require("./inventario/inventario.js");
var recursos = require("./recursos/recursos.js");

function rtd(req,res){

	if(req.body.mdl == undefined)req.body = req.query;

	try{
		var post = req.body;

		switch(post.mdl){

			/////////////////////////////////////
			//INICIO CODIGO EDITABLE/////////////

			case 'expedientes': //Solo modificar integrantes equipo expedientes
				switch(post.acc){
					case 'ejemplo': expedientes.ejemplo(req,res); break;
					default: error.send(500,res,777,post.mdl,post.acc,'USR',3,'');
				}
			break;

			case 'facturacion': //Solo modificar integrantes equipo facturacion
				switch(post.acc){
					case 'ejemplo': facturacion.ejemplo(req,res); break;
					default: error.send(500,res,777,post.mdl,post.acc,'USR',3,'');
				}
			break;

			case 'inventario': //Solo modificar integrantes equipo inventario
				switch(post.acc){
					case 'ejemplo': inventario.ejemplo(req,res); break;
					default: error.send(500,res,777,post.mdl,post.acc,'USR',3,'');
				}
			break;

			case 'recursos': //Solo modificar integrantes equipo recursos
				switch(post.acc){
					case 'ejemplo': recursos.ejemplo(req,res); break;
					default: error.send(500,res,777,post.mdl,post.acc,'USR',3,'');
				}
			break;


			//FIN CODIGO EDITABLE////////////////
			/////////////////////////////////////

			default:
				var error = require("./libs/error.js");
				error.send(500,res,777,post.mdl,post.acc,'USR',3,''); 
			break;
		}
	}catch(e){
		var error = require("./libs/error.js");

		err_usuario = "SESSION";

		if(e.error != undefined){
			var tipo = 'SYS';
			var nivel = 2;
			if(e.tipo != undefined){tipo = e.tipo; nivel = e.nivel};
			var error = require("./libs/error.js");
			error.send(500,res,e.error,post.mdl,post.acc,tipo,nivel,e+'',err_usuario);		
		}else{
			var error = require("./libs/error.js");
			error.send(500,res,9999,post.mdl,post.acc,'NAN',4,e+'',err_usuario);
		}
	}
}

module.exports = rtd;