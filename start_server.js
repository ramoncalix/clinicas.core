var app = require('./app');

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    //REINICIA WORKET SERVIDOR FALLIDO
    cluster.fork();
  });
}else{
	//INICIA SERVIDOR
  app.listen(3000);

  if('production' == app.get('env')){  
    console.log('Iniciado Servidor CORE en puerto 3000 PRODUCCION');  
  }else{
    console.log('Iniciado Servidor CORE en puerto 3000 DESARROLLO');  
  }
	
}