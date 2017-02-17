(function() {
    var socket = io();
    var form = document.querySelector('#chat-input');
    var messageInput = document.querySelector('#typed-message');

    socket.on('message.send', addText);
    socket.on('user.connect', addText);
    socket.on('user.disconnect', addText);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        socket.emit('message.recieve', messageInput.value);
        messageInput.value = '';
    });

    function addText(msg) {
        var messages = document.querySelector('#messages');
        var textNode = document.createTextNode(msg);
        var li = document.createElement('li');
        li.appendChild(textNode);
        messages.appendChild(li);
    }
})();