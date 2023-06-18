const fs = require("fs");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send(`
        <h1>HOME PAGE</h1>
    `);
});
app.get("/users/", (req, res) => {
    fs.readFile("./api", (err, data) => {
        if (err) {
            res.send(`
                <h1>DATA WERE NOT FOUND!</h1>
            `);
        } else {
            let name = JSON.parse(data);
            let html = "";
            for(let x of name){
                html += "=>" + x.name +"<br>";
            }
            res.send(`
            <h1>${html}</h1>
            `);
        }
    });
});
app.get("/users/:id", (req, res) => {
    fs.readFile("./api", (err, data) => {
        if (err) {
            res.send(`
                <h1>DATA WERE NOT FOUND!</h1>
            `);
        } else {
            let name = JSON.parse(data);
            name = name.find((v) => {
                return v.id === parseInt(req.params.id);
            })
            if (name) {
                res.send(`
                <h1>${name["name"]}</h1>`);
            } else {
                res.send(`
                <h1>USER WAS NOT FOUND!</h1>
                `);
            }

        }
    });
});
app.get("*", (req, res) => {
    res.send(`
        <h1>404 NOT FOUND!</h1>
    `);
});

var port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});