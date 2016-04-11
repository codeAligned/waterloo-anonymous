var connected = false;
var username = 'Faizan';
var room = '';
var socket = io('http://localhost');

var show_chat_window = function(data) {
});

socket.on('connect', function (data) { // we are connected, should send our name
    connected = true;
    if (username) socket.emit('login', {'username' : username});
});

socket.on('chat start', function(data) {
    room = data.room;
    show_chat_window(data.name); // some method which will show chat window
});

socket.on('chat end', function(data) {
    hide_chat_window(); // this will close chat window and alert user that the peer ended chat
    socket.leave(room); // it's possible to leave from both server and client, hoever it is better to be done by the client in this case
    room = '';
});

socket.on('disconnect', function(data) { // handle server/connection falling
    console.log('Connection fell or your browser is closing.');
});

var send_message = function(text) { // method, which you will call when user hits enter in input field
    if (connected) socket.emit('message', {'text': text});
};

var leave_chat = function() { // call this when user want to end current chat
    if (connected) {
        socket.emit('leave room');
        socket.leave(room);
        room = '';
    }
};
