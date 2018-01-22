var five = require("johnny-five");
var board = new five.Board({port:"COM9"});

board.on('ready', function () {
  // instance of the servo is created
  var servo = new five.Servo({ // builder
    pin: 9,
    startAt:0,
    //range: [0, 90], // degrees (esta configuración viene por default)
    center: true, // default
    type:"continuous"
  });

  //servo.to(0);
  
  servo.stop();

  setTimeout(function(){
  	/*servo.sweep({
	  	range: [0, 90], 
	  	interval: 1500,
	  	step: 10
	}); // rotate¨*/

  	//servo.stop();

  	servo.sweep({
	  		range: [100,0],
	  		interval:1500,
	  		step:10
	});

	setTimeout(function(){
		//servo.stop();
	},1500);

  	//servo.stop();

	/*setTimeout(function(){
	  	
	  	
	  	setTimeout(function(){
	  		servo.stop();
	  	},1000)

	},1000)*/

  },1500)
  

  //servo.to(90, 500, 10)
  //servo.to(90);
  //servo.max();
  //delay(100);
  //servo.to(80);

  //servo.cw(0.5);

  



})