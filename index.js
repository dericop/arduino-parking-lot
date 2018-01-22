var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SerialPort = require('serialport');

var port = new SerialPort('COM12', {
	baudRate: 9600,
	stopBits: 1,
	parity: 'none'
});

app.get('/', function(req, res){
  res.sendFile('/Users/camil/Desktop/arduino_parking_lot/index.html');
});

app.use(express.static('app'));

io.on('connection', function(socket){

	socket.on('disconnect', function(){
		console.log('Usuario desconectado');
	});

	socket.on('open', function(msj){
		port.write(msj);
	})

	socket.on('lights', function(msj){
		port.write(msj);
	});
	
	port.on('readable', function(){
		var read = port.read();
		if(read != null){
			var inst = read.toString();
			var inst_t = inst.trim(); 

			console.log(inst_t);

			if(inst_t.includes("EA"))
				io.emit('EA', 'EA');

			if(inst_t.includes("ED"))
				io.emit('ED', 'ED');

			if(inst_t.includes("SA"))
				io.emit('SA', 'SA');

			if(inst_t.includes("SD"))
				io.emit('SD', 'SD');

			if(inst_t.includes("VA1"))
				io.emit('VA1', 'VA1');

			if(inst_t.includes("VA2"))
				io.emit('VA2', 'VA2');

			if(inst_t.includes("VA3"))
				io.emit('VA3', 'VA3');

			if(inst_t.includes("NVA1"))
				io.emit('NVA1', 'NVA1');

			if(inst_t.includes("NVA2"))
				io.emit('NVA2', 'NVA2');			

			if(inst_t.includes("NVA3"))
				io.emit('NVA3', 'NVA3');


			if(inst_t.includes("Q")){
				quantity = inst_t.split(":")[1];
				io.emit("Q", quantity);
			}

		
		}
			

	});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});