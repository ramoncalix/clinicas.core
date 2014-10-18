module.exports = {
	mongodb:{
		host: 'localhost',
		port: 27017,
		db: 'clinicas',
		user: 'root',
		password: '1234'
	},
	mysqldb:{
		host: 'localhost',
		port: 3306,
		connectionLimit: 100,
		database: 'clinicas',
		charset: 'UTF8_GENERAL_CI',
		timezone: 'local',
		supportBigNumbers: true,
		dateStrings: false,
		user: 'root',
		password: 'negocios'
	},
	mysqldb_log:{
		host: 'localhost',
		port: 3306,
		database: 'clinicas_log',
		charset: 'UTF8_GENERAL_CI',
		timezone: 'local',
		supportBigNumbers: true,
		dateStrings: false,
		user: 'root',
		password: 'negocios'
	},
	aws:{ //AmazonAWS API
		accessKeyId: '',
		secretAccessKey: '',
		region: 'us-east-1',  //Virginia DataCenter
		ses: '2010-12-01'
	},
	core:{ //Configuracion del Nucleo
		actionLimitTime: 400, //Milesimas de segundo
		cacheLimitTime: 10000, //Limite por defecto del cache en Milesimas de segundo
		excludedSessionActions: { //Acciones excluidas de la comprobacion de session
			'usuarios-login': true
		},
		cacheActionTime: { //Limite de tiempo personalizado para el cache en millis
			//'usuarios-perfil': 10000
		},
		limitActionTime: { //Limite de tiempo de penalizacion personalizado para las acciones en millis
			//'usuarios-invitar': 10000
		}
	},
	correo:{
	    charset: "utf-8",
	    noreplymail: 'noreply@unicah.edu'
	}
};