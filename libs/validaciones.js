var tools = require('./tools.js');

function validaciones(tipo,valor){

	var reg = '';

	if(valor == undefined) return false;

	switch(tipo){
		case 'usuario': 	reg = /^[A-Za-z0-9_-]{2,20}$/g; break;
		case 'sid': 	 	reg = /^.{10,40}$/g; break;
		case 'key': 	 	reg = /^.{1,128}$/g; break;
		case 'value': 	 	reg = /^.{1,5000}$/g; break;
		case 'correo': 		reg = /^[\w-\._\+%]+@(hotmail|yahoo|gmail|outlook|live).[\w]{2,6}(.[\w]{2,6})?$/g; break;
		case 'clave': 		reg = /^.{4,100}$/g; break;
		case 'invitacion': 	reg = /^.{4,10}$/g; break;
		case 'url': 		reg = /^((http:\/\/)|(https:\/\/))?([a-zA-Z0-9]+[.])+[a-zA-Z]{2,5}(:\d+)?(\/[~_.\-a-zA-Z0-9=&%@:]+)*\??[~_.\-a-zA-Z0-9=&%@:]*$/g; break;
		case 'video': 		reg = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/; break;
		case 'arreglo':		return tools.is_array(valor); break;
		default: 			return false;
	}

	if(valor.match(reg)) return true;

	return false;

}

module.exports = validaciones;