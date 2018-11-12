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

app.use(express.static(path.join(__dirname, '/scripts')));
app.use(express.static(path.join(__dirname, '/images')));
app.use('/', express.static(path.join(__dirname, '/')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'test1.html'));
});
app.listen(app.get('port'), app.get('host'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
