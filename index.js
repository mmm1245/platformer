var path = require('path');
var express = require('express');
var app = express();


var htmlPath = path.join(__dirname, 'client');

app.use(express.static(htmlPath));

var server = app.listen(3000, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});

const io = require('socket.io')(4000).listen(server);


io.on('connect', socket => {
  socket.emit('platform-add', { 'x': 100,'y': 500,'w': 200,'h':30, 'mode':0});
  socket.emit('platform-add', { 'x': 200,'y': 400,'w': 200,'h':30, 'mode':0});

  socket.on('message', (data) => {
    console.log(data);
  });

  socket.on('player-pos', (data) => {
    io.emit('player-pos', data);
    //console.log('player ' + data.name + "x:" + data.x + "y:" + data.y);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('disconnect');
  });

  socket.on('win', (name) => {
    console.log(name + ' won the game');
    io.emit('restart');
    io.emit('platform-add', { 'x': 100,'y': 500,'w': 200,'h':30, 'mode':0});
    io.emit('platform-add', { 'x': 200,'y': 400,'w': 200,'h':30, 'mode':0});
  });

  socket.on('changename', (beforename, name) => {
    io.emit('changename', {'before':beforename, 'after':name});
  });

  console.log('a player connected');
});
