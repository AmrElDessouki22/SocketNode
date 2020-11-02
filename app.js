var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('join', (id, msg) => {
      socket.join(id)
      console.log(id);
      io.sockets.in(id).emit('messageotherside',msg);
    });
    socket.broadcast.emit('admin say hi ');
  });
http.listen(3000, () => {
  console.log('listening on *:3000');
});