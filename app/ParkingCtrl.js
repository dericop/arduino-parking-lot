(function(){

	angular
		.module('app.controllers')
		.controller('ParkingCtrl', ParkingCtrl)

	ParkingCtrl.$inject = ["$scope"];

	function ParkingCtrl($scope){
		var that = this;

		that.slot1IsEnabled = false;
		that.slot2IsEnabled = false;
		that.slot3IsEnabled = false;

		that.door1IsOpen = false;
		that.door2IsOpen = false;
		that.lightsOn = false;
		that.v1Assigned = false;
		that.v2Assigned = false;
		that.v3Assigned = false;
		that.quantity = "10";
		that.code = "";
		that.authorizedCodes = ["h522", "7450007492019","7702189033536"];

		that.openDoorAnimation = openDoorAnimation;
		that.openExitAnimation = openExitAnimation;
		that.openDoor = openDoor;
		that.openExit = openExit;
		that.turnLightsOn = turnLightsOn;
		that.validateCode = validateCode;


		var socket = io();	

		function validateCode(){
			if(that.authorizedCodes.indexOf(that.code.toLowerCase()) != -1){
				that.openExit();
			}else{
				swal({
				  title: "Atenciòn!",
				  text: "Debes pagar el recibo para salir",
				  icon: "error",
				  button: "Aceptar",
				});
			}
		}

		function turnLightsOn(){
			that.lightsOn = !that.lightsOn;

			if(that.lightsOn)
				socket.emit('lights', 'EL');
			else
				socket.emit('lights', 'NL');
		}

		function openDoorAnimation(){
			$(".door").velocity({
				height:"0px"
			},{
			    duration: 2000,
			    easing: "swing",
			    complete:function(){
			    	setTimeout(function(){
			    		$(".door").velocity({
			    			height:"165px"
			    		},{
			    			duration: 2000,
			    			easing: "swing"
			    		});

			    	}, 3000);
			    }
			});

		}

		function openExitAnimation(){

			$(".door-exit").velocity({
				height:"0px"
			},{
			    duration: 2000,
			    easing: "swing",
			    complete:function(){
			    	setTimeout(function(){
			    		$(".door-exit").velocity({
			    			height:"165px"
			    		},{
			    			duration: 2000,
			    			easing: "swing"
			    		});

			    	}, 3000);
			    }
			});
		}

		function openDoor(){
			socket.emit('open', 'AE');
			openDoorAnimation();
		}

		function openExit(){
			socket.emit('open', 'AS');
			openExitAnimation();
		}

		socket.on('EA', function(msj){
			openDoorAnimation();
		});

		socket.on('ED', function(msj){
			swal({
			  title: "Atención!",
			  text: "No estás autorizado para entrar",
			  icon: "error",
			  button: "Aceptar",
			});
		});

		socket.on('SA', function(msj){
			console.log("Salida Aprobada");
		});

		socket.on('SD', function(msj){
			console.log("Salida Denegada");
		});

		socket.on('VA1', function(msj){
			that.v1Assigned = true;
			$scope.$apply();
		});

		socket.on("VA2", function(msj){
			that.v2Assigned = true;
			$scope.$apply();
		});

		socket.on("VA3", function(msj){
			that.v3Assigned = true;
			$scope.$apply();
		});

		socket.on('NVA1', function(msj){
			that.v1Assigned = false;
			$scope.$apply();
		});

		socket.on("NVA2", function(msj){
			console.log("NVA2");
			that.v2Assigned = false;
			$scope.$apply();
		});

		socket.on("NVA3", function(msj){
			that.v3Assigned = false;
			$scope.$apply();
		});

		socket.on("Q", function(msj){
			console.log("cantidad "+msj);
			that.quantity = msj;
			$scope.$apply();
		});


	}
	
})();