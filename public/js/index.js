
var socket = io();

socket.on('connect', function() {
  console.log('CONNECTED TO SERVER');
});

socket.on('disconnect', function() {
  console.log('DISCONNECTED FROM SERVER');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});
