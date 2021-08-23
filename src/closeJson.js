const closeJson = (jsonResult) => function () {
  const formmatedJson = JSON.stringify(jsonResult, null, 2);
  console.log(formmatedJson);
}

module.exports = closeJson;