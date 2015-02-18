var conf = {
  "settings": {
    "hidde": {},
    "compatible": {"option": "no"}
  },
  "mapping": [
    {
      "mode": [
        "Insert",
        "Replace"
      ],
      "map": "jj",
      "command": "<Esc>'^",
      "comment": "Easy access to normal mode"
    }
  ]
}
var fs = require('fs');
var clc = require('cli-color');

var cError = clc.red.bold;
var cWarn = clc.yellow;
var cNotice = clc.blue;

var settingOptions = JSON.parse(fs.readFileSync('options.json', 'utf8'));
var vimrcName = "vimrc";
var out = fs.createWriteStream(vimrcName, { encoding: "utf8" });
var commentFlag = true;


if (commentFlag) {
  console.log(cNotice('Flag: Comment flag is active, each setting will have an explanation'));
}

if (conf.hasOwnProperty("settings")) {
  var settings = conf.settings;
  for (var setting in settings) {
    if (settings.hasOwnProperty(setting)) {
      if (settingOptions.hasOwnProperty(setting)) {
        if (commentFlag === true) {
          out.write('" ' + settingOptions[setting].explanation + '\n');
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
