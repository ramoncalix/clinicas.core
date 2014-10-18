//MODULOS NODEJS
var express         = require('express');
var connect         = require('connect');
var bodyParser      = require('body-parser');
var compress        = require('compression');
var errorHandler    = require('errorhandler');
var ankmodb         = require('./libs/modb.js');
var ankmydb         = require('./libs/mydb.js');
var conf            = require('./conf.js');
var rtd             = require('./rtd.js');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var methodOverride  = require('method-override');
var morgan          = require('morgan');
var jade            = require('jade');
var error           = require("./libs/error.js");
var integridad      = require("./libs/integridad.js");
var unch_session    = {};


//MANEJADORES APLICACION
var app             = express();
var router          = express.Router();

//MIDDLEWARES EXPRESS
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(compress());
app.use(cookieParser());
app.use(morgan('dev'));


//CONTROL DE ORIGENES
app.use(function(req,res,next){

    // originUrl = req.headers['origin'];

    // if(originUrl == 'http://unicah.edu' || 
    // originUrl == 'http://core.unicah.edu' || 
    // originUrl == 'http://app.unicah.edu' || 
    // originUrl == 'http://udrive.unicah.edu' || 
    // originUrl == 'http://unicah.dev' || 
    // originUrl == 'http://core.unicah.dev' || 
    // originUrl == 'http://app.unicah.dev' || 
    // originUrl == 'http://udrive.unicah.dev'){
    //     res.header('Access-Control-Allow-Origin', originUrl);
    //     res.header('Access-Control-Allow-Methods', 'POST');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    //     res.header('Access-Control-Allow-Headers', 'Content-Type');
    // }

    next();
});

//MIDDLEWARES CORE
app.use(function(req, res, next){ //DBs

    req.modb = ankmodb;
    req.mydb = ankmydb;
    req.session = unch_session;
    //req.jade = jade;
    
    next();
});

//PARAMETROS EXPRESS
app.disable('x-powered-by');

//RUTAS
router.get('/', rtd);
router.post('/', rtd);
app.use('/', router);

//MANEJADOR DE ERROR 404
app.use(function(req, res, next) {
    res.send({error: "NO ENCONTRADO"});
});


module.exports = app;
