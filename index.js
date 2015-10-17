#!/usr/bin/env node

var net = require('net');
var allContainers = require('docker-allcontainers');
var loghose = require("docker-loghose");
var program = require('commander');
var through = require('through2');
var os = require("os");


program
  .version('0.1.0')
  .option('-h, --host [host]', 'LogIo server host', 'localhost')
  .option('-p, --port [port]', 'LogIo server port', 28777)
  .option('-n, --name [name]', 'LogIo node name', os.hostname())
  .parse(process.argv);



function connect() {
  var stream = net.createConnection(program.port, program.host);
  return stream;
}
var s = connect();

var ee = allContainers({
  preheat: true,
  docker: null,
  matchByName: process.env.MATCHBYNAME || '',
});

var opts = {
  json: false,
  docker: null,
  events: ee
};
loghose(opts).pipe(through.obj(function(chunk, enc, cb){
  this.push('+log|'+chunk.image+'|'+chunk.name+'|info|'+chunk.line+'\r\n');
  cb();
})).pipe(s);

ee.on('start', function(meta, container) {
  s.write('+node|'+meta.name+'|'+meta.image+'\r\n');
});
ee.on('stop', function(meta, container) {
  s.write('-node|'+meta.name+'\r\n');
});
