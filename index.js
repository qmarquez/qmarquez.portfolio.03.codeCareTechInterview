const jsonResult = {};
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', processLine)

function processLine(line) {
  const [accessLine, value] = line.split(' = ');
  const accesors = accessLine.split('.');
  processAccesors(jsonResult, accesors, value);
}

function processAccesors(baseObject, accesors, value) {
  const [rootAccesor, ...othersAccesors] = accesors;

  if (baseObject[rootAccesor] && typeof baseObject[rootAccesor] !== 'object') {
    const auxValue = baseObject[rootAccesor];
    baseObject[rootAccesor] = {};
    if (!othersAccesors) {
      // do number ascending stuff
    } else {
      processAccesors(baseObject[rootAccesor], othersAccesors, value);
    }
  }

  if (!othersAccesors.length) {
    baseObject[rootAccesor] = isNaN(value) ? value : Number(value);
  } else {
    if (!baseObject[rootAccesor]) {
      baseObject[rootAccesor] = {};
    }
    processAccesors(baseObject[rootAccesor], othersAccesors, value);
  }
}

rl.on('close', closeJson);

function closeJson() {
  formmatedJson = JSON.stringify(jsonResult, null, 2);
  console.log(formmatedJson);
}