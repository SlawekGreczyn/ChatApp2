var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var escape = require('escape-html');

app.use('/', express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    var id = socket.id;
    socket.emit('user-accepted', {id: id});

    socket.on('chat-message', function (messageData) {
        messageData['userId'] = id;
        messageData['createdAt'] = Date.now();
        messageData['msg'] = escape(messageData.msg);
        messageData['nick'] = escape(messageData.nick);
        io.emit('recive-message', messageData);
    });
});

var port = process.env.PORT || 8080;

http.listen(port, function () {
    console.log('listening on *:' + port);
});