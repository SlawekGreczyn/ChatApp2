(function () {
    var socket = io();

    var name = getName();
    var userId = '';
    var notify = false;

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
        var date = new Date(data.createdAt);

        if (data.userId === userId) {
            $message.addClass('my-message');
        } else if (notify) {
            try {
                var notification = new Notification('New Message', {
                    body: 'From ' + data.nick,
                    vibrate: [200, 100, 200],
                    icon: 'http://www.iconsfind.com/wp-content/uploads/2013/11/Buzz-Message-outline-icon.png'
                });
            } catch(err) {}
        }

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
        Notification.requestPermission(function (result) {
            if (result === 'granted') {
                notify = true;
            }
        });
        
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
