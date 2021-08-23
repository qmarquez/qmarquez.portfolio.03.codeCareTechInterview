const jsonResult = {};
const { createInterface } = require('readline');
const rl = createInterface({
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

  if (baseObject[rootAccesor]) {
    if (typeof baseObject[rootAccesor] !== 'object') {
      const auxValue = baseObject[rootAccesor];
      baseObject[rootAccesor] = {};
      baseObject[rootAccesor][0] = auxValue;
    }

    if (!othersAccesors.length) {
      let auxAccesor = 0
      while (baseObject[rootAccesor][auxAccesor]) {
        auxAccesor++;
      }
      baseObject[rootAccesor][auxAccesor] = value;
    } else {
      processAccesors(baseObject[rootAccesor], othersAccesors, value);
    }
  } else {
    if (!othersAccesors.length) {
      baseObject[rootAccesor] = isNaN(value) ? value : Number(value);
    } else {
      if (!baseObject[rootAccesor]) {
        baseObject[rootAccesor] = {};
      }
      processAccesors(baseObject[rootAccesor], othersAccesors, value);
    }
  }
}

rl.on('close', closeJson);

function closeJson() {
  formmatedJson = JSON.stringify(jsonResult, null, 2);
  console.log(formmatedJson);
}