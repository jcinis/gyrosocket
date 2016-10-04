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

  // Start this party
  this.init();
}

GyroSocket.prototype.getValue = function(){
  return this.value;
}

GyroSocket.prototype.init = function(){
  console.log('Initializing GyroSocket');
}

GyroSocket.prototype.deviceOrientationListener = function(event) {
  var value = {
      "alpha": Math.round(event.alpha),
      "beta": Math.round(event.beta),
      "gamma": Math.round(event.gamma)
  }

  if(this.value != value){
      this.changeValue(value);
  }
}

GyroSocket.prototype.changeValue = function(value) {
  this.value = value;
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

var gyroSocket = new GyroSocket('/socket');
window.addEventListener('deviceorientation', function(event){
  gyroSocket.deviceOrientationListener(event);
});

window.addEventListener('GyroSocketValue',function(event){
  document.getElementById("alpha").innerHTML = "alpha: " + gyroSocket.value.alpha;
  document.getElementById("beta").innerHTML = "beta: " + gyroSocket.value.beta;
  document.getElementById("gamma").innerHTML = "gamma: " + gyroSocket.value.gamma;
});
