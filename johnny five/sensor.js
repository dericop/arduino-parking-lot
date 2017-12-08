var five = require("johnny-five");
var board = new five.Board({ port: "COM11" });

board.on("ready", function() {

  var eyes = new five.IR.Reflect.Array({
    emitter: 13,
    pins: ["A0"],
    freq: 25
  });
/*
  for (var i = 0; i < 100; i++) {
    eyes.calibrate();
  }*/

  eyes.on('data', function() {
    console.log( "Valor: ", this.raw );
  });

  eyes.on('line', function() {
    console.log( "Posición de linea: ", this.line);
  });
  eyes.enable();
});