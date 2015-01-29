#!/usr/bin/env node

var reader  = require('./reader');
var program = require('commander');
var util    = require('util');

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .parse(process.argv);

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ reader index.html');
  console.log('');
});

program.parse(process.argv);

for (var fileIndex = 0; fileIndex < program.args.length; fileIndex++) {
  console.log(util.inspect(reader.readFile(program.args[fileIndex]), {
    showHidden: false,
    depth: null
  }));
}