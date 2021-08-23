const processLine = (jsonResult) => function (line) {
  const [accessLine, value] = line.split(' = ');
  const accesors = accessLine.split('.');
  processAccesors(jsonResult, accesors, value);
}

function processAccesors(baseObject, accesors, value) {
  const [rootAccesor, ...othersAccesors] = accesors;
  const haveMoreAccesors = othersAccesors.length;

  if (baseObject[rootAccesor]) {
    if (typeof baseObject[rootAccesor] !== 'object') {
      transformInObjectAndMoveValue(baseObject, rootAccesor);
    }

    if (!haveMoreAccesors) {
      let auxAccesor = 0
      while (baseObject[rootAccesor][auxAccesor]) {
        auxAccesor++;
      }
      baseObject[rootAccesor][auxAccesor] = realValue(value);
    } else {
      processAccesors(baseObject[rootAccesor], othersAccesors, value);
    }
  } else {
    baseObject[rootAccesor] = haveMoreAccesors ? {} : realValue(value);

    if (haveMoreAccesors) {
      processAccesors(baseObject[rootAccesor], othersAccesors, value);
    }
  }
}

function transformInObjectAndMoveValue(baseObject, rootAccesor) {
  const auxValue = baseObject[rootAccesor];
  baseObject[rootAccesor] = {};
  baseObject[rootAccesor][0] = auxValue;
}

function realValue(value) {
  return isNaN(value) ? value : Number(value);
}

module.exports = processLine;