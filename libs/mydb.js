var config = require('../conf.js');
var tools = require('./tools.js');
var mysql = require('mysql');

function mydb(){

	var db = mysql.createPool(config.mysqldb);

	var query = function(_query,_parms,_callback){
		db.getConnection(function(err, con) {
			if(err){
				var error = require('../libs/error.js');
				error.log(998,'mydb','connect','DB',3,err+'');
			}else{
				con.query(_query,_parms,function(err,res){

					if(err){
						var error = require('../libs/error.js');
						error.log(998,'mydb','query','DB',3,err+'');
					}
					
					con.release();

					//Si es arreglo y viene vacio, regresamos null en ves del arreglo
					if(tools.is_array(res) && res.length == 0) res = null;

					_callback(err,res);
				});
			}
		});
	};

	var escape = function(variable){
		return db.escape(variable);
	};

	var escapeId = function(variable){
		return db.escapeId(variable);
	};

	return {
		query: query,
		escape: escape,
		escapeId: escapeId
	};
}

module.exports = mydb();