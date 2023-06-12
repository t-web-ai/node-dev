var fs = require("fs");
var http = require("http");
var port = 80;

var server = http.createServer(function(req, res){
    fs.readFile("./api.txt", "utf-8", function(err, data){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write(data);
        res.end();
    });
});

server.listen(port, function(){
    console.log(`Server is listening on port ${port}`);;
});
