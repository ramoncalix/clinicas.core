var error = require("./error.js");
var logs = require('./logs.js');
var config = require("../conf.js");

function correo(){

	var notificacion = function (req, res, mail){

		var usuario = req.session.usuario.usuario;
		var data = {};

		data.from = "uDrive UNICAH <"+config.correo.noreplymail+">";
		data.to = mail.correo;
		data.subject = "Notificación - uDrive";
		data.html = "";
		
		enviar(req, res, data, 'INV');

	}

	var enviar = function (req, res, data, tipo){
		var ses = req.ses;

		if(req.session.login){
			var usuario = req.session.usuario.usuario;	
		}else{
			var usuario = '';
		}

		var parms = {
			Destination: {
				ToAddresses: [data.to]
			},
			Message: {
				Subject: {Data: data.subject,Charset: config.correo.charset},
				Body: {
					Html: {Data: data.html,Charset: config.correo.charset},
					Text: {Data: data.html,Charset: config.correo.charset}
				}
			},
			Source: data.from
		};

		ses.sendEmail(parms, function(err, rs){
			if(err){
				logs.correo(data,tipo,usuario);
				error.log(997,'SES','sendEmail','AWS',3,err.stack+'');
			}
		});
	}

	return {
		notificacion: notificacion,
		enviar: enviar
	};
}

module.exports = correo();