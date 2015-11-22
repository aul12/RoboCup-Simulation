var http = require("http");
var fs = require('fs');
var url = require("url");
var rest = require("./restHandler.js");

http.createServer(function (request, response) {
    if(request.method == 'POST'){
        rest.postHandle(request, function(){
            console.log(rest._POST("abc"));
        });
    }
    else {
        var pathname = url.parse(request.url).pathname;
        console.log(pathname);
        var html;
        if(pathname == "/favicon.ico")
            html = "";
        else{
            pathname = "../local/"+pathname.substr(1);
            fs.lstat(pathname, function(err, stats){
                if(stats.isDirectory()){
                    if(pathname.charAt(pathname.length-1)!="/")
                        pathname+="/";
                    pathname += "index.html";
                }
                fs.readFile("../local/" + pathname, "utf-8", function(err, data){
                    response.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
                    response.end(data);
                });
            });

        }

    }

}).listen(8081);
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');