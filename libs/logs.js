var config = require('../conf.js');
var mysql = require('mysql');
var tiempo = require('../libs/tiempo');

function logs(){

	var db = mysql.createConnection(config.mysqldb_log);

	db.connect(function(err){
		if(err){
			console.log("LOG-ERROR: Error al conectar a la base de datos.");
			console.log(err);
		}
	});
	
	var err = function(_err){

		var time = tiempo.millis();
		var uid = Math.floor((Math.random() * 9999) + 1000);

		//db.query("INSERT INTO errores VALUES("+time+","+uid+",'"+_err.error+"','"+_err.modulo+"','"+_err.accion+"','"+_err.tipo+"',"+_err.nivel+",\""+_err.descripcion+"\",\""+_err.usuario+"\");",function(err,res){
		var parms = [time,uid,_err.error,_err.modulo,_err.accion,_err.tipo,_err.nivel,_err.descripcion,_err.usuario];
		db.query("INSERT INTO errores VALUES(?,?,?,?,?,?,?,?,?);",parms,function(err,res){
			if(err){
				console.log(err);
				console.log("LOG-ERROR: "+err+"");
			}
		});
	};

	var correo = function(_correo,_tipo,_usuario){

		var time = tiempo.millis();
		var stime = tiempo.segs();
		var uid = Math.floor((Math.random() * 9999) + 1000);

		var parms = [time,uid,_correo.to,_tipo,_correo.subject,_correo.html,_usuario,stime,'PDT'];
		db.query("INSERT INTO correos VALUES(?,?,?,?,?,?,?,?,?);",parms,function(err,res){

			if(err){
				console.log(err);
				console.log("MAIL-ERROR: "+err+"");
			}
		});
	};

	return {
		err: err,
		correo: correo
	};
}

module.exports = logs();