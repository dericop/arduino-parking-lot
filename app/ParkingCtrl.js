(function(){

	angular
		.module('app.controllers')
		.controller('ParkingCtrl', ParkingCtrl)

	ParkingCtrl.$inject = ["$scope"];

	function ParkingCtrl($scope){
		var that = this;

		that.test = "Test";

		that.slot1IsEnabled = false;
		that.slot2IsEnabled = false;
		that.slot3IsEnabled = false;

		that.door1IsOpen = false;
		that.door2IsOpen = false;
	}



})();