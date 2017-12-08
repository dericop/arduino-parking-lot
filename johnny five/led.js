var five = require("johnny-five");
var board = new five.Board({ port: "COM11" });

board.on("ready", function() {
  var led = new five.Led(12);

  // This will grant access to the led instance
  // from within the REPL that's created when
  // running this program.
  this.repl.inject({
    led: led
  });

  led.blink();
});
