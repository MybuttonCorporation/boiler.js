const { readFileSync } = require("fs");

module.exports = JSON.parse(readFileSync(__dirname + '/package.json', {encoding: 'utf-8'}));