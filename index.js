var express = require('express');
var app = express();
var io = require('socket.io');

app.use(express.static('static'));
app.use('/', express.static('index.html'));

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.listen(8000, function () {
  console.log('gyroscope running on localhost:8000');
});
