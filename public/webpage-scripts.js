(function () {
    var socket = io();

    $('#form').submit(function () {
        var data = {
            'nick': $('#user-name').val(),
            'msg' : $('#message-content').val()
        };

        socket.emit('chat-message', data);
        $('#m').val('');
        return false;
    });

    socket.on('recive-message', function (data) {
        $('#messages').append(
            '<li>' +
            '   <div class="nick-name">data.nick</div>' +
            '   <div class="incomming-message">data.msg</div>' +
            '</li>'
        );
    });
})();
