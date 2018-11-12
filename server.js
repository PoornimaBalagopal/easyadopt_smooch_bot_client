/**
 * Cuppa OAuth Node Server
 * (c) 2016 Cuppa Labs
 * License: MIT
 */

var path = require('path');

var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');

//var h5bp = require('h5bp');
var compression = require('compression');


var app = express();
app.use(compression());

app.set('port', process.env.PORT || 5011);
//app.set('host', process.env.NODE_IP || 'localhost');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
    app.use(function (req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}
//app.use(h5bp({ root: __dirname + '/dist' }));
app.use(express.static(path.join(__dirname, '/scripts')));
app.use(express.static(path.join(__dirname, '/images')));
app.use('/', express.static(path.join(__dirname, '/')))

/* setInterval(function () {
    var msg = Math.random();
    console.log("Clients: " + Object.keys(clients) + " <- " + msg);
    for (clientId in clients) {
        clients[clientId].write("data: " + msg + "\n\n"); // <- Push a message to a single attached client
    };
}, 15000); */

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'test1.html'));
});


app.listen(app.get('port'), app.get('host'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});