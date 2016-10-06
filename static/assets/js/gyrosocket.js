function GyroSocketException() {};
function GyroSocketDeviceMotionException() {};

function GyroSocket(options) {
  /*
  GyroSocket utilizes the sockets.io library as well as the browser's
  deviceorientation events to send signals from a phone to a webpage
  */

  // Set options
  this.debug = options && options.debug ? true : false;
  this.uri = options && options.uri ? options.uri : '/gyrosocket';
  this.onchange = options && options.onchange ? options.onchange : undefined;
  this.serving = false;
  this.listening = false;

  // Set default values
  this.value = {
    'alpha':0,
    'beta':0,
    'gamma':0
  }

  // Connect to socket.io
  this.socket = io.connect(uri);

}

GyroSocket.prototype.getValue = function(){
  return this.value;
}

GyroSocket.prototypes.server = function(){
  var self = this;

  if(!this.serving){
    this.serving = true;

    // listen for device orientation changes
    window.addEventListener('deviceorientation', function(event){
      self.deviceOrientationListener(event);
    });

    if(this.debug) console.log('Initializing GyroSocket Server');
  }
}

GyroSocket.prototype.deviceOrientationListener = function(event) {
  var self = this;

  // Set the new value rounded to the nearest integer
  var value = {
      "alpha": Math.round(event.alpha),
      "beta": Math.round(event.beta),
      "gamma": Math.round(event.gamma)
  }

  // Check to see if the value has changed before emmitting a new value
  if(JSON.stringify(this.value) != JSON.stringify(value)){
      this.changeValue(value);
  }
}

GyroSocket.prototype.changeValue = function(value) {
  this.value = value;
  this.socket.emit('value', this.getValue());
  window.dispatchEvent(this.valueChangeEvent());
  if(this.onchange) this.onchange(this.value);
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
