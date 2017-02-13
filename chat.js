const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const path = require('path');
const port = process.env.PORT || 3000;

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));

io.on('connection', socket => {
    socket.on('message_send', msg => {
        io.emit('message_send', msg);
    });
});

server.listen(port);


// TODO:
// 1. Broadcast a message to connected users when someone connects or disconnects
// 2. Add support for nicknames
// 3. Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
// 4. Add “{user} is typing” functionality
// 5. Show who’s online
// 6. Add private messaging