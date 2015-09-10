var http = require("http");
http.globalAgent.maxSockets = 1000;

var Docker = require('../lib/docker');
var fs     = require('fs');

// For Mac OS X:
// socat -d -d unix-l:/tmp/docker.sock,fork tcp:<docker-host>:4243
// DOCKER_SOCKET=/tmp/docker.sock npm test

var socket   = process.env.DOCKER_SOCKET || '/var/run/docker.sock';
var isSocket = fs.existsSync(socket) ? fs.statSync(socket).isSocket() : false;
var docker;

var tcphost="http://192.168.5.152";
var tcpport=8081;
var serviceKey="7ER9.xwdkdrVzrN.UEb1rBaRGR.1rnRJOqFe"

if (!isSocket) {
  console.log('Trying TCP connection... host is '+tcphost +' post is'+tcpport +' service key is '+serviceKey);
  
  
  docker = new Docker({host:tcphost,port:tcpport,serviceKey:serviceKey});
  dockert = new Docker({host:tcphost,port:tcpport,timeout: 1,serviceKey:serviceKey});
} else {
  docker = new Docker({ socketPath: socket });
  dockert = new Docker({ socketPath: socket, timeout: 1 });
}

module.exports = {
  'docker': docker,
  'dockert': dockert
};
