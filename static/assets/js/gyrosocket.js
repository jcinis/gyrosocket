function GyroSocket(options) {
  /*
  GyroSocket utilizes the sockets.io library as well as the browser's
  deviceorientation events to send signals from a phone to a webpage
  */

  // Set options
  this.debug = options && options.debug ? true : false;
  this.uri = options && options.uri ? options.uri : '/gyrosocket';
  this.onchange = options && options.onchange ? options.onchange : undefined;
  this.sending = false;
  this.receiving = false;

  // Set default values
  this.value = {
    'alpha':0,
    'beta':0,
    'gamma':0
  };

  // Connect to socket.io
  this.socket = io.connect(this.uri);

}

GyroSocket.prototype.setValue = function(value){
  this.value = value;
  if(this.onchange) this.onchange(this.value);
  if(this.sending) {
    if(self.debug) console.log('Emmitting Value:', value);
    this.socket.emit('value', this.value);
  }
}

GyroSocket.prototype.send = function(){
  var self = this;

  if(!self.sending){
    if(self.debug) console.log('Initializing GyroSocket Server');
    self.sending = true;

    // listen for device orientation changes
    window.addEventListener('deviceorientation', function(event){

      // Set the new value rounded to the nearest integer
      var value = {
          "alpha": Math.round(event.alpha),
          "beta": Math.round(event.beta),
          "gamma": Math.round(event.gamma)
      }

      // Check to see if the value has changed before emmitting a new value
      if(JSON.stringify(self.value) != JSON.stringify(value)){
          self.setValue(value);
      }
    });
  }

  return self;
}

GyroSocket.prototype.receive = function(){
  var self = this;

  if(!self.receiving){
    self.receiving = true;

    self.socket.on('value', function(value) {
      self.value = value;
      self.setValue(value);
      if(self.debug) console.log('Receiving Value', value);
    });

    if(this.debug) console.log('Initializing GyroSocket Listener');
  }
}
