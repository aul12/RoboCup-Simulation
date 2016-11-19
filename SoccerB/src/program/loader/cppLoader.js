const fs = require('fs');
var sys = require('util');
var exec = require('child_process').exec;
var child;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function loadFile(fnameSrc, fnameDst, defines) {
    reloadFile(fnameSrc, fnameDst, defines);
    fs.watchFile(fnameSrc, function(curr, prev){
        console.log("file changed");
        reloadFile(fnameSrc, fnameDst, defines);
    });
}

function reloadFile(fnameSrc, fnameDst, defines) {
    fs.readFile(fnameSrc, 'utf8', function (err, data) {
        data = data.replaceAll("void", "function").replaceAll("inline", "");

        while (data.indexOf("\(function\)") > -1)
            data = data.replace("\(function\)", "()");


        data = data.replaceAll("::", ".");

        data = data.replaceAll("uint16_t", "var").replaceAll("uint8_t", "var").replaceAll("int16_t", "var").replaceAll("int8_t", "var").replaceAll("int", "var").replaceAll("char", "var").replaceAll("byte", "var").replaceAll("bool", "var");

        while (data.indexOf("\(var\)") > -1)
            data = data.replace("\(var\)", "");
        data = defines + data;

        fs.writeFile(fnameDst, data, function (err) {
            child = exec("cpp -P -Wundef -nostdinc -Wtrigraphs -C " + fnameDst, function (error, stdout, stderr) {
                eval(stdout);
                fs.writeFile(fnameDst, stdout, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

            });
        });
    });
}
