var config = require('../conf.js');
var mongodb = require('mongodb');
var logs = require('../libs/logs.js');

function modb(){

	var server = new mongodb.Server(config.mongodb.host,config.mongodb.port);
	var db = new mongodb.Db(config.mongodb.db,server,{safe:true});
	var cols = {};

	db.open(function(err,db){

		if(err){
			var error = require('../libs/error.js');
			error.log(998,'modb','connect','DB',3,err+'');
		}else{
			cols = {
				unch_sessions: db.collection("unch_sessions"),
			}
		}
	});

	function getCol(_collection){
		var error = require('../libs/error.js');

		switch(_collection){
			case 'unch_sessions': 		return cols.unch_sessions;
			default:				error.log(998,'modb','getcol','DB',3,{messaje: 'Collecion no controlada, debe agragarla a ankmdb.js', collection: _collection});
			
		}
	}

	var insert = function(_collection,_data,_safemode,_callback){
		var col = getCol(_collection); //var col = cols[_collection];

		var opt = {};

		if(_safemode) opt.w = 1;

		col.insert(_data,opt,function(err,res){

			if(err){
				var error = require('../libs/error.js');
				error.log(998,'modb','insert','DB',3,err+'');
			}
			
			_callback(err,res);
		});
	}

	var update = function(_collection,_where,_data,_safemode,_multi,_upsert,_callback){
		var col = getCol(_collection);

		var opt = {};

		if(_safemode) opt.w = 1;
		if(_multi) opt.multi = true;
		if(_upsert) opt.upsert = true;

		col.update(_where,_data,opt,function(err,res){
			
			if(err){
				var error = require('../libs/error.js');
				error.log(998,'modb','update','DB',3,err+'');
			}
			

			_callback(err,res);
		});
	}

	var findOne = function(_collection,_where,_display,_callback){
		var col = getCol(_collection);

		if(typeof _display == 'function'){
			_callback = _display;
			_display = {};
		}

		col.findOne(_where,_display,function(err,res){

			if(err){
				var error = require('../libs/error.js');
				error.log(998,'modb','findOne','DB',3,err+'');
			}
			
			_callback(err,res);
		});
	}

	var find = function(_collection,_where,_limit,_skip,_callback){
		var col = getCol(_collection);

		var opt = {};

		if(_limit) opt.limit = _limit;
		if(_skip) opt.skip = _skip;

		col.find(_where,opt).toArray(function(err,res){

			if(err){
				var error = require('../libs/error.js');
				error.log(998,'modb','find','DB',3,err+'');
			}
			
			_callback(err,res);
		});
	}

	var ObjectID = function(_idstring){
		return new mongodb.ObjectID(_idstring);
	};

	return {
		insert: insert,
		findOne: findOne,
		find: find,
		ObjectID: ObjectID,
		update: update
	};
}

module.exports = modb();