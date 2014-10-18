var mensajes = require("./mensajes.js");

function error(){

	var send = function(_status, _res, _code, _modulo, _accion, _tipo, _nivel, _descripcion, _usuario){

		var logs = require('./logs.js');

		var rerr = {
			error: _code,
			modulo: _modulo,
			accion: _accion,
			tipo: _tipo,
			nivel: _nivel,
			descripcion: _descripcion,
			usuario: _usuario
		};

		if(_tipo == 'USR'){
			rerr.descripcion = mensajes[_code];
			logs.err(rerr);
		}

		if(_tipo != 'USR'){
			logs.err(rerr);
			rerr.descripcion = mensajes[999];
		}

		_res.status(_status);
		_res.send(rerr);
	};

	var log = function(_code, _modulo, _accion, _tipo, _nivel, _descripcion){

		var logs = require('./logs.js');

		var rerr = {
			error: _code,
			modulo: _modulo,
			accion: _accion,
			tipo: _tipo,
			nivel: _nivel,
			descripcion: _descripcion
		};

		logs.err(rerr);
	};

	return {
		send: send,
		log: log
	};

}

module.exports = error();