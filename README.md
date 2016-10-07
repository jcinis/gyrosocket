# GyroSocket

Control a desktop website using the gyroscope of a paired iPhone or Android device.

## Requirements
Since you'll likely be testing this application locally using your local network, you'll need your phone to be on the same wifi or in the same network as your desktop and will need to know the network ip address of the desktop computer (on a mac, you can simply type ```ifconfig``` and look for the inet address under en0.)

## Installation
```
npm install
```

## Usage

**In a console**, run the node socket application using the following command:
```
node index.js
```

**On your desktop**, open a web browser to the following location:
```
http://{YOUR_IP_ADDRESS}:8000/
```

**On your phone**, open a web browser to the following location:
```
http://{YOUR_IP_ADDRESS}:8000/phone.html
```

You should now be able to move your phone around and see the parameters change on your desktop.




