(function () {
    var socket = io();

    var name = getName();
    var userId = '';

    var $messages = $('#messages');

    $('#new-message').submit(function (e) {
        e.preventDefault();

        var data = {
            'nick': name,
            'msg': $('#message-content').val()
        };

        socket.emit('chat-message', data);
        $('#message-content').val('');

        return false;
    });

    socket.on('recive-message', function (data) {
        var $message = $('<li/>');

        if (data.userId === userId) {
            $message.addClass('my-message');
        }

        var date = new Date(data.createdAt);

        $('<div/>')
            .addClass('nick-name')
            .text(data.nick + ' at: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())
            .appendTo($message);

        $('<div/>')
            .addClass('incomming-message')
            .text(data.msg)
            .appendTo($message);

        $message.appendTo($messages);
    });

    socket.on('user-accepted', function (data) {
        userId = data.id;
    });

    function getName() {
        if (localStorage.getItem('userName')) {
            return localStorage.getItem('userName');
        }

        var name = prompt('Please enter your name.');

        if (name === '' || name === null) {
            return getName();
        }

        localStorage.setItem('userName', name);

        return name;
    }
})();
