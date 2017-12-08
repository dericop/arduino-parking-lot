var five = require("johnny-five");
var board = new five.Board({ port: "COM11" });


board.on("ready", function() {

  var motion = new five.Motion(8);
  var led = new five.Led(2);
  this.repl.inject({
    led: led
  });
/*    led.pulse();
    led.stop().off();
*/
  motion.on("calibrated", function() {
    console.log("calibrated");
  });

  motion.on("motionstart", function() {
    console.log("motionstart");
    led.blink();
  });

  motion.on("motionend", function() {
    console.log("motionend");
    led.stop().off();
  });
});