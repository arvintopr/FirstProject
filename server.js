var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var twilio = require('twilio');
var bodyParser = require('body-parser');

var accountSid = 'ACaf997a5c76593178f4ab1ef746bb9ebc'; // Your Account SID from www.twilio.com/console
var authToken = 'ec0e1e39937d29174d519e7f7296befa';   // Your Auth Token from www.twilio.com/console


app.use(express.static(__dirname));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/test', function(req, res) {
    console.log(req.body.Body);
    var message = req.body.Body;
    if (message == '1') { 
        io.emit('text', '1');
    } else if ( message == '2') {
        io.emit('text', '2');
    } else if (message == '3') {
        io.emit('text', '3');
    } else {
        io.emit('text', '4');
    }
})

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// phone number = 650-667-8407