const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    // msg is a string, so wrap it with text and sender
    io.emit('chat message', { text: msg, sender: socket.id });
  });
});

server.listen(5000, () => {
  console.log('Server listening on port 5000');
});
