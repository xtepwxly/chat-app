const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const port = process.env.PORT || 3000;

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));

const persons = new Map();

io.on('connection', socket => {
    socket.on('join', user => {
        persons.set(socket.id, user);
        socket.broadcast.emit('user.connect', `Welcome, ${user}!`);
    });

    socket.on('message.receive', msg => {
        const user = persons.get(socket.id);
        io.emit('message.send', `${user}: ${msg}`);
    });

    socket.on('disconnect', () => {
        const user = persons.get(socket.id);
        persons.delete(socket.id);
        socket.broadcast.emit('user.disconnect', `${user} disconnected`);
    });
});

server.listen(port);


// TODO:
// 3. Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
// 4. Add “{user} is typing” functionality
// 5. Show who’s online
// 6. Add private messaging