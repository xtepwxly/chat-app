(function() {
    var name = '';
    do {
        name = prompt('Enter your chat name:');
    } while (name.length < 1);

    var socket = io();
    var form = document.querySelector('#chat-input');

    socket.emit('join', name);

    socket.on('message.send', addText);
    socket.on('user.connect', addText);
    socket.on('user.disconnect', addText);

    form.addEventListener('submit', function(e) {
        var messageInput = document.querySelector('#typed-message');
        socket.emit('message.receive', messageInput.value);
        messageInput.value = '';
        e.preventDefault();
    });

    function addText(msg) {
        var messages = document.querySelector('#messages');
        var textNode = document.createTextNode(msg);
        var li = document.createElement('li');
        li.appendChild(textNode);
        messages.appendChild(li);
    }
})();