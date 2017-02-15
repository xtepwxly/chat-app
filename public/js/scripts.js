(function() {
    var socket = io();
    var form = document.querySelector('#chat-input');
    var messageInput = document.querySelector('#typed-message');
    var messages = document.querySelector('#messages');

    socket.on('messageSend', function(msg) {
        var textNode = document.createTextNode(msg);
        var li = document.createElement('li');
        li.appendChild(textNode);
        messages.appendChild(li);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        socket.emit('messageRecieve', messageInput.value);
        messageInput.value = '';
    });
})();