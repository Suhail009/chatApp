const path       = require('path');
const http       = require('http');
const express    = require('express');
const socketIO   = require('socket.io');

const publicPath = path.join(__dirname, '../public');  // NEW WAY
const port       = process.env.PORT || 2000

var app          = express();
var server       = http.createServer(app);
var io           = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.emit('newMessage', {
    from : 'Admin',
    text : 'Welcome to the chat room',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from : 'Admin',
    text : 'New User Joined',
    createdAt : new Date().getTime()  
  });

  socket.on('createMessage', (message) => {
      console.log('Message Created', message);

  io.emit('newMessage', {
    from:message.from,
    test: message.text,
    createdAt: new Date().getTime()
  });

  // socket.broadcast.emit('newMessage', {
  //   from: message.from,
  //   text: message.text,
  //   createdAt: new Date().getTime()
  // });

});

  socket.on('disconnect', () => {
    console.log('User Was Disconnected');
  });
});



server.listen(port , () => {
  console.log(`SERVER IS UP ON ${port}`);
});

/*app.listen(port, ()=>{
  console.log(`SERVER IS UP ON ${port}`);
});
*/
