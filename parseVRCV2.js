var fs = require('fs');
require('babel/register');

fs.readFile('otherOptionsStuff.txt', {'encoding': 'utf8'}, function (err, data) {
  if (err) throw err;
  data
    .split('\n')
    .filter(e => e.startsWith('set '))
    .map(e => console.log(e.substr(3).trim()));
});
