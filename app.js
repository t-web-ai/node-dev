var x = require("http");
x.createServer(function(req, res){
    res.write("Hello World");
    res.end();
}).listen(80, ()=>{
    console.log("Server is listening on port 80");
});
