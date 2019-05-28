var express = require("express");
var app = express();
var nodemailer = require('nodemailer');
var LocalEmail = '';
var LocalClient = '';

// Settings for CORS only for test in localhost
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.static(__dirname + "/public"));
var port = process.env.PORT || 3000;
var server = app.listen(port);
var io = require("socket.io").listen(server);

io.on("connection", function (socket) {
    console.log("CONECTADO DE UNA VEZ!");
    socket.on('sentConfirmation', function (toSend) {
        socket.email = toSend;
        //let temp = JSON.parse(socket.email);
        console.log(socket.email);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'fjsancheztrellit@gmail.com',
                pass: 'Qwerty_12345'
            }
        });

        var mailOptions = {
            from: 'fjsancheztrellit@gmail.com',
            to: socket.email,
            subject: 'Bienvenido a Trellit ✔',
            text: 'Hola: ' + socket.email + '. Te has registrado en Trellit, esperamos que tu experiencia sea de pleno' +
                'gusto. Si tienes alguna duda ponte en contacto respondiendo a este Mail!'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    });
    socket.on('sentEmail', function (email) {
        LocalEmail = '';
        LocalEmail = email;
        return LocalEmail;
    });
    socket.on('sentClient', function (client) {
        LocalClient = '';
        LocalClient = client;
        return LocalClient;
    });

    socket.on('sentNewLogin', function (response) {
        //console.log(JSON.parse(response));
        let temp = JSON.parse(response);
        //console.log(temp.data.country);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'fjsancheztrellit@gmail.com',
                pass: 'Qwerty_12345'
            }
        });

        var mailOptions = {
            from: 'fjsancheztrellit@gmail.com',
            to: LocalEmail,
            subject: 'Bienvenido a Trellit ✔',
            text: 'Hola: ' + LocalEmail + '. Se ha iniciado sesion en un cliente --> ' + LocalClient + ', con la IP--> '
                + temp.data.ip + ', desde--> ' + temp.data.city + ' ' + temp.data.region + ' ' + temp.data.country_name
                + ' ' + temp.data.country + ' / ' + temp.data.continent_code + ', latitud--> ' + temp.data.latitude
                + ', longitud--> ' + temp.data.longitude + ', registrado por la organización--> ' + temp.data.org
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

});

