const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req,res) =>{
res.sendFile(__dirname + '/index.html');
});

app.post('/contact',(req,res) =>{
if(
   req.body.captcha === undefined ||
   req.body.captcha === '' ||
   req.body.captcha === null
){
    return res.json({"success": false, "msg":"please select captcha"});

}
// secret key
const secretKey = '6LdRbGYfAAAAACh7NKeRvI-oZdQdgVzE-XKv-3Cq';

// verify URL
const verifyUrl = 'https://google.com/recaptcha/api/siteverify?secret=${secretKey}&reponse=${req.body.captcha}&remoteeip=${req.connection.remoteAddress}';

// make request to verifyURL
request (verifyUrl,(err,response,body) =>{
body = JSON.parse(body);

// If not successful
if (body.success  !== undefined  && !body.success){
return res.json({"success": false, "msg":"Failed captcha verification"});

}
//If Successful
return res.JSON({"success": true, "msg":"Captcha passed"});
});
});

app.listen(3000, () =>{
    console.log('server strated on port 3000');
});