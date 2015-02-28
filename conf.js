var fs = require('fs');
var clc = require('cli-color');

var cError = clc.red.bold;
var cWarn = clc.yellow;
var cNotice = clc.blue;

var inputFile = 'testVimrc.json';//process.argv[2];
var outputFile = 'vimrc';//process.argv[3];
var commentFlag = process.argv[4];

var setFile = JSON.parse(fs.readFileSync('options.json', 'utf8'));
var conf = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
var out = fs.createWriteStream(outputFile, { encoding: "utf8" });

if (commentFlag) {
  console.log(cNotice('Flag: Comment flag is active, each setting will have an explanation'));
}

if (conf.hasOwnProperty("settings")) {
  var settings = conf.settings;
  for (var setting in settings) {
    if (settings.hasOwnProperty(setting)) {
      if (setFile.hasOwnProperty(setting)) {
        if (commentFlag === true) {
          out.write('" ' + setFile[setting].explanation + '\n');
        }
        out.write("set " + setting);
        if (settings[setting].hasOwnProperty("option")) {
          out.write("=" + settings[setting].option);
        }
        out.write("\n");
      }
      else {
        console.log(cWarn('Warn: "' + setting + '" is not a valid setting'));
      }
    }
  }
}
else {
  console.log("Warn: No settings found");
}
out.end();
