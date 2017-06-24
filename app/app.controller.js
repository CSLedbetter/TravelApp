(function () {
    'use strict';

    angular
        .module('travelApp')
        .controller('travelCtrl', travelCtrl)

    travelCtrl.$inject = ['travelFactory'];

    function travelCtrl(travelFactory) {
        var vm = this;
        vm.show = false;
        vm.info = false;
        vm.click = click;
        vm.onActivate = onActivate;
        vm.clickVid = clickVid

        function onActivate(flightNumber) {
            travelFactory
                .getFlightCodes(flightNumber)
                .then(function (citiCode) {
                    vm.info=true;
                    console.log(citiCode);
                    getCitiName(citiCode);
                });
        }
        function getCitiName(citiCode) {

            travelFactory
                .getArrivalData(citiCode)
                .then(function (arrivalAirportInfo) {
                    vm.citiName = arrivalAirportInfo.data.city;
                    vm.airportName = arrivalAirportInfo.data.name;
                    vm.avgDelay = arrivalAirportInfo.data.status.avgDelay;
                    vm.reason = arrivalAirportInfo.data.status.reason;

                    
                    getWeather(vm.citiName);
                    getRestInfo(vm.citiName);
                });
        }
        function getWeather(citiName) {
            //alert('controller working')
            travelFactory
                .getWeather(citiName)
                .then(function (response) {
                    var arrayInfo = (response.data.list[0]);
                    vm.city = arrayInfo.name;
                    vm.lgnLat = arrayInfo.coord;
                    vm.lgnLatDisplay = arrayInfo.coord.lat + ', ' + arrayInfo.coord.lon;
                    vm.currentTemp = arrayInfo.main.temp;
                    vm.pressure = arrayInfo.main.pressure;
                    vm.humidity = arrayInfo.main.humidity;
                    vm.lowTemp = arrayInfo.main.temp_min;
                    vm.highTemp = arrayInfo.main.temp_max;
                    vm.windSpeed = arrayInfo.wind.speed;
                    var icon = arrayInfo.weather[0].icon;
                    vm.iconImage = 'http://openweathermap.org/img/w/' + icon + '.png';
                    vm.show = true;  
                });
        }
        function getRestInfo(citiName) {
            //alert('controller working')
            travelFactory
                .getRestInfo(citiName)
                .then(function (restInfo) {
                    // vm.info=true;
                     vm.businesses = restInfo.data.businesses;
                });
        }
        // Click function to show video
        function clickVid() {

            vm.show = true;
        };
        // click function to show flight info
        function click() {

            vm.info = true;
        };
    }

})();
                    