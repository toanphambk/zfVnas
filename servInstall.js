var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Mes Service',
  description: 'Service to host the Mes application',
  script: './main.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

svc.on('install',function(){
  svc.start();
});

svc.install();