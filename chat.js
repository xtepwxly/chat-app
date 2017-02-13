const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const path = require('path');
const port = process.env.PORT || 3000;

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

io.on('connection', (socket) => {
    console.log('random user connected');
});

server.listen(port);
