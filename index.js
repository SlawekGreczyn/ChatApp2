var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/public'));

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat-message', function(messageData){
        io.emit('recive-message', messageData);
    });
});

var port = process.env.PORT || 8080;

http.listen(port, function(){
    console.log('listening on *:' + port);
});