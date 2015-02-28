var fs = require('fs');
require("babel/register");

function parseSetStr (str, map) {
  if (str.includes('=')) {
    var x = str.split('=');
    if (x[1].includes(',')) {
      var y = x[1].split(',');
      map.set(x[0], {options: y});
    } else if (x[0].endsWith('+')) {
      var y = x[0].substr(0, x[0].length-1);
      if (map.has(y)) {
        var op = map.get(y).options;
        op.push(x[1]);
        map.set(y, {options: op});
      } else {
        map.set(y, {options: [x[1]]});
      }
    } else {
      map.set(x[0], {options: [x[1]]});
    }
  } else if (str.startsWith('no')) {
    map.set(str.substr(2), {options: ['no']});
  } else {
    map.set(str, {options: ['']});
  }  
}

fs.readFile('otherOptionsStuff.txt', {'encoding': 'utf8'}, function (err, data) {
  if (err) throw err;
  var m = new Map();
  data
    .split('\n')
    .filter(e => e.startsWith('set '))
    .map(e => e.substr(3).trim())
    .forEach(e => {
      e.split(' ').forEach(s => {
        parseSetStr(s, m);
      });
    });
  m.forEach( (k, v) => console.log(k.options + ' key: ' + v));
});
