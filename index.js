var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/public'));

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat-message', function(msg){
        console.log('message: ' + msg);
        io.emit('recive-message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});