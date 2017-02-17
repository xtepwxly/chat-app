(function() {
    var name = '';
    do {
        name = prompt('Enter your chat name:');
    } while (name.length < 1);

    var socket = io();
    var form = document.querySelector('#chat-input');
    var messageInput = document.querySelector('#typed-message');
    var whoIsTyping = document.querySelector('#who-typing');
    var timeout = null;

    socket.emit('join', name);

    socket.on('chat', addText);
    socket.on('user.connect', addText);
    socket.on('user.disconnect', addText);
    socket.on('user.typing', displayWhoIsTyping);

    form.addEventListener('submit', function(e) {
        socket.emit('chat', messageInput.value);
        messageInput.value = '';
        e.preventDefault();
    });

    messageInput.onkeypress = function() {
        socket.emit('user.typing');
    };

    function displayWhoIsTyping(msg) {
        whoIsTyping.textContent = msg;
        if (timeout) {
            timeout = null;
        }
        timeout = setTimeout(function() {
            whoIsTyping.textContent = '';
        }, 1000);
    }

    function addText(msg) {
        var messages = document.querySelector('#messages');
        var textNode = document.createTextNode(msg);
        var li = document.createElement('li');
        li.appendChild(textNode);
        messages.appendChild(li);
    }
})();