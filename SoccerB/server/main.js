var http = require("http");
var fs = require('fs');
var url = require("url");

function handleFile(text){
    console.log(text);
}




http.createServer(function (request, response) {
        if(request.method == 'POST') {
            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                handleFile(body);
            });

        } else {
            var pathname = url.parse(request.url).pathname;
            console.log(pathname);
            var html;
            if (pathname == "/")
                html = fs.readFileSync("../local/index.html", "utf-8");
            else if(pathname == "/favicon.ico")
                html = "";
            else
                html = fs.readFileSync("../local/" + pathname.substr(1), "utf-8");

            response.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': html.length});
            response.end(html);
        }

}).listen(8081);
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');