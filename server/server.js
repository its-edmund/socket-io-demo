const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});
const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  })
})

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})