const fs = require("fs");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
    <meta name="viewport" content="width=device-width">
    <title>Home</title>
    </head>
    <body>
    <h1>HOME PAGE</h1>
    </body>
    </html> 
    `);
});
app.get("/users/", (req, res) => {
    fs.readFile("./api", (err, data) => {
        if (err) {
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                <meta name="viewport" content="width=device-width">
                <title>404</title>
                </head>
                <body>
                <h1>DATA WERE NOT FOUND!</h1>
                </body>
                </html> 
            `);
        } else {
            let name = JSON.parse(data);
            let html = "";
            for(let x of name){
                html += "=>" + x.name +"<br>";
            }
            res.send(`
            <!DOCTYPE html>
            <html>
            <head>
            <meta name="viewport" content="width=device-width">
            <title>Users</title>
            </head>
            <body>
            <h1>${html}</h1>   
            </body>
            </html>
            `);
        }
    });
});
app.get("/users/:id", (req, res) => {
    fs.readFile("./api", (err, data) => {
        if (err) {
            res.send(`
            <!DOCTYPE html>
            <html>
            <head>
            <meta name="viewport" content="width=device-width">
            <title>404</title>
            </head>
            <body>
            <h1>DATA WERE NOT FOUND!</h1>
            </body>
            </html> 
                
            `);
        } else {
            let name = JSON.parse(data);
            name = name.find((v) => {
                return v.id === parseInt(req.params.id);
            })
            if (name) {
                res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                <meta name="viewport" content="width=device-width">
                <title>User : ${name["name"]}</title>
                </head>
                <body>
                <h1>${name["name"]}</h1>
                </body>
                </html> 
                
                `);
            } else {
                res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                <meta name="viewport" content="width=device-width">
                <title>404</title>
                </head>
                <body>
                <h1>USER WAS NOT FOUND!</h1>
                </body>
                </html> 
                
                `);
            }

        }
    });
});
app.get("*", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
    <meta name="viewport" content="width=device-width">
    <title>404</title>
    </head>
    <body>
    <h1>404 NOT FOUND!</h1>
    </body>
    </html> 
        
    `);
});

var port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
