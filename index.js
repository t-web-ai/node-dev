const express = require("express");
const app = new express();
const nodemailer = require("nodemailer");

const num = [0,"A",1,"B",2,"C",3,"D",4,"E",5,"F",6,"G",7,"H",8,"X",9,"Z"];
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${3000}...`);
});

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/html/index.html");
})

app.post("/mail", (req, res)=>{
    let otp ="";
    for(let i=0;i<6;i++){
        otp +=num[Math.floor(((Math.random()*(num.length-1))+0))];
    }
    let email = req.body.email;

    const transporter = nodemailer.createTransport({
        service : "Gmail",
        auth : {
            user : "otpservice150037@gmail.com",
            pass : "agnshmauakrnchus"
        }
    });
    const mail_option = {
        from : "otpservice150037@gmail.com",
        to : email,
        subject : "Your OTP",
        html : `
        <h1>${otp}</h1>
        `
    }
    transporter.sendMail(mail_option, (err, info)=>{
        if(err){
            res.send({"error": 404});
        } else {
            res.send({"otp" : otp});
        }
    });
});
