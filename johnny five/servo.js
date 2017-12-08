var five = require("johnny-five");
var board = new five.Board({port:"COM11"});

board.on('ready', function () {
  var servo = new five.Servo({ // builder
    pin: 9,
    range: [0, 90],
    center: true,
  });
  servo.sweep();
})


/*
var five = require("johnny-five");
var board = new five.Board({port:"COM11"});

board.on("ready", function() {

  // Create a new `servo` hardware instance.
  var servo = new five.Servo(10);

  // Create a new `animation` instance.
  var animation = new five.Animation(servo);

  // Enqueue an animation segment with options param
  // See Animation example and docs for details
  animation.enqueue({
    cuePoints: [0, 0.25, 0.75, 1],
    keyFrames: [90, { value: 180, easing: "inQuad" }, { value: 0, easing: "outQuad" }, 90],
    duration: 2000
  });

  // Inject the `servo` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    servo: servo,
    animation: animation
  });
});
*/