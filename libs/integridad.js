var error = require("./error.js");
var config = require("../conf.js");

function existe_usuario(req, res, usuario, retorno){

	var modb = req.modb;

	modb.findOne('usuarios',{usuario: usuario},function(err,rs){
		if(err){
			error.send(500,res,999,'libs','existe_usuario','USR',1,err+'',req.session.usuario.usuario);
		}else{
			if(rs){
				retorno(true);
			}else{
				retorno(false);
			}
		}
	});
}

function valida_invitacion(req, res, invitacion, retorno){

	var mydb = req.mydb;
	var qry = "";
	var parms = new Array();

	//invitacion = mydb.escape(invitacion);
	qry = "SELECT 1 FROM invitaciones WHERE invitacion = ? AND estado = 'D';";
	parms = [invitacion];

	mydb.query(qry,parms,function(err,rs){
		if(err){
			error.send(500,res,999,'libs','valida_invitacion','USR',1,err+'',req.session.usuario.usuario);
		}else{
			
			if(rs){
				retorno(true);
			}else{
				retorno(false);
			}
		}
	});
}

function valida_sesion(req,res,retorno){

	excludedActions = config.core.excludedSessionActions;

    if(excludedActions[req.body.mdl+"-"+req.body.acc] != undefined){
        retorno();
    }else{
        if(req.session.usuario != undefined){
            if(req.session.login == 1){
                retorno();
            }else{
                error.send(401,res,444,req.body.mdl,req.body.acc,'USR',2,'');    
            }
        }else{
            error.send(401,res,444,req.body.mdl,req.body.acc,'USR',2,'');
        }
    }
}

function ankcache(req,res,retorno){

	//Fecha de la verificacion
	var acctime = new Date().getTime();

	//Obtenemos el modulo, la accion y el identificador unico.
	var mdl = req.body.mdl;
	var acc = req.body.acc;
	var uid = req.body.uid;

	if(uid == undefined){
		uid = "";
	}else{
		uid = "-"+uid;
	}

	//Obtenemos Ultima acción
	if(req.session.acciones == undefined){
		req.session.acciones = {};
		req.session.acciones[(mdl+'-'+acc+uid)] = {
			acctime: acctime
		};

		retorno(req,res,cache_catch);
	}else{
		var uacc = req.session.acciones[(mdl+'-'+acc+uid)];
	
		if(uacc != undefined){
			var diff = acctime - uacc.acctime;
			
			//Comprobamos que no sobrepase el limite de acciones permitidas
			var actionLimitTime = 0;
			
			if(config.core.limitActionTime[mdl+'-'+acc] == undefined){
				actionLimitTime = config.core.actionLimitTime
			}else{
				actionLimitTime = config.core.limitActionTime[mdl+'-'+acc];
			}

			if(diff > actionLimitTime){

				if(req.session.acciones[(mdl+'-'+acc+uid)] == undefined){
					req.session.acciones[(mdl+'-'+acc+uid)] = {};
				}
				
				req.session.acciones[(mdl+'-'+acc+uid)].acctime = acctime;

				//Si existe un cache valido, lo enviamos como respuesta
				var cacheLimitTime = 0;

				if(config.core.cacheActionTime[mdl+'-'+acc] == undefined){
					cacheLimitTime = config.core.cacheLimitTime
				}else{
					cacheLimitTime = config.core.cacheActionTime[mdl+'-'+acc];
				}

				diffcache = acctime - uacc.cachetime;

				if(diffcache < cacheLimitTime){
					res.send(uacc.cache);
				}else{
					retorno(req,res,cache_catch);	
				}
			}else{

				if(req.session.acciones[(mdl+'-'+acc+uid)] == undefined){
					req.session.acciones[(mdl+'-'+acc+uid)] = {};
				}
				
				req.session.acciones[(mdl+'-'+acc+uid)].acctime = acctime;

				error.send(500,res,888,'libs','valida_accion','USR',1,'',req.session.usuario.usuario);
			}
		}else{

			if(req.session.acciones[(mdl+'-'+acc+uid)] == undefined){
				req.session.acciones[(mdl+'-'+acc+uid)] = {};
			}
			
			req.session.acciones[(mdl+'-'+acc+uid)].acctime = acctime;

			retorno(req,res,cache_catch);
		}
	}
}


function cache_catch(req,_mdl,_acc,_cache){

	if(req.body.uid == undefined){
		uid = "";
	}else{
		uid = "-"+req.body.uid;
	}

	req.session.acciones[(_mdl+'-'+_acc+uid)].cachetime = new Date().getTime();
	req.session.acciones[(_mdl+'-'+_acc+uid)].cache = _cache;
}

var integridad = {
	existe_usuario: existe_usuario,
	valida_invitacion: valida_invitacion,
	ankcache: ankcache,
	valida_sesion: valida_sesion
}

module.exports = integridad;