function GyroSocketException() {};
function GyroSocketDeviceMotionException() {};

function GyroSocket(uri) {

  this.value = {
    'alpha':0,
    'beta':0,
    'gamma':0
  }

  this.uri = uri;
  this.has_motion = true;

  this.socket = io.connect(uri);
  console.log('Initializing GyroSocket');
}

GyroSocket.prototype.getValue = function(){
  return this.value;
}

GyroSocket.prototype.deviceOrientationListener = function(event) {
  var value = {
      "alpha": Math.round(event.alpha),
      "beta": Math.round(event.beta),
      "gamma": Math.round(event.gamma)
  }

  if(JSON.stringify(this.value) != JSON.stringify(value)){
      this.changeValue(value);
  }
}

GyroSocket.prototype.changeValue = function(value) {
  this.value = value;
  this.socket.emit('gyrosocket-value', this.getValue());
  window.dispatchEvent(this.valueChangeEvent());
}

GyroSocket.prototype.valueChangeEvent = function(){

  var event = new CustomEvent(
    "GyroSocketValue",
    {
      "detail": {
        "message":"GyroSocket Value Changed",
        "time": new Date(),
        "value": this.value
      },
      "bubbles":true,
      "cancelable":true
    }
  );

  return event;
}


// Main Program ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//var socket = io.connect('http://localhost:8000/');
//socket.on('news', function (data) {
//  console.log(data);
//  socket.emit('my other event', { my: 'data' });
//});


//var uri = '/device/12345';
var uri = '/gyrosocket';
var gyroSocket = new GyroSocket(uri);
window.addEventListener('deviceorientation', function(event){
  gyroSocket.deviceOrientationListener(event);
});

window.addEventListener('GyroSocketValue',function(event){
  document.getElementById("alpha").innerHTML = "alpha: " + gyroSocket.value.alpha;
  document.getElementById("beta").innerHTML = "beta: " + gyroSocket.value.beta;
  document.getElementById("gamma").innerHTML = "gamma: " + gyroSocket.value.gamma;
});

gyroSocket.changeValue({ 'alpha':9, 'beta':9, 'gamma':9 });
