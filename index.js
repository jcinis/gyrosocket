var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8000);

app.use(express.static('static'));
app.use('/', express.static('index.html'));

io.on('connection', function(socket) {
  //socket.emit('news', { hello:'world' });
  socket.on('gyrosocket-value', function (data) {
    console.log(data);
  });
});

//app.listen(8000, function () {
//  console.log('gyroscope running on localhost:8000');
//});
