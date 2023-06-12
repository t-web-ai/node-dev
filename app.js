var fs = require("fs");
var http = require("http");
var port = 80;

var server = http.createServer(function(req, res){
    fs.readFile("/api.txt", "utf-8", function(err, data){
        if(err){
            res.write("404 File is not found!");
            res.end();
        } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        var x = JSON.parse(data)[0];
        res.write(`
        <h1>Node Development</h1>
        <h1>Name : ${x["name"]}</h1>
        <h1>Age : ${x["age"]}</h1>
        <h1>Gender : ${x["gender"]}</h1>
        `);
        res.end();
        }
    });
});

server.listen(port, function(){
    console.log(`Server is listening on port ${port}`);;
});
