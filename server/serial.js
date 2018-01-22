'use strict';

var SerialPort = require('serialport');

var port = new SerialPort('COM12', {
   baudRate: 9600,
   stopBits: 1,
   parity: 'none'
});

port.on('readable', function () {
  console.log(port.read().toString());
});