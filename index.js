const jsonResult = {};

const { createInterface } = require('readline');
const { processLine, closeJson } = require('./src');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('line', processLine(jsonResult));
rl.on('close', closeJson(jsonResult));
