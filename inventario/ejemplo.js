var validacion = require('../libs/validaciones.js');
var error = require('../libs/error.js');

function crear(req,res){

	var mydb = req.mydb;

	//Obtenemos variables de usuario
	var identidad = req.body.identidad;
	var nombre = req.body.nombre;
	var telefono = req.body.telefono;
	var edad = req.body.edad;

	//Validaciones
	if(!validacion("usuario",nombre)) throw {error: 101, tipo: 'USR', nivel: 1};

	//QUERYS
	//Comprobar si existe el expediente
	var query = "SELECT * FROM expedientes WHERE identidad = ?;";
	var parms = [identidad];

	mydb.query(query,parms,function(err,rs){
		
		if(rs){
			//Si existe enviamos error
			error.send(200,res,102,req.body.mdl,req.body.acc,'USR',1,'');
		}else{
			//Insertar expediente
			query = "INSERT INTO expedientes VALUES(?,?,?,?);";
			parms = [identidad,nombre,telefono,edad];

			mydb.query(query,parms,function(err,rs){
				res.send("Expediente Creado "+identidad);
			});	
		}
	});	
}

module.exports = crear;