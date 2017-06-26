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
        vm.toggle = false;

        function onActivate(flightNumber) {
            //alert('controller working')
            travelFactory
                .getFlightCodes(flightNumber)
                .then(function (citiCode) {
                    vm.info=true;
                    getCitiName(citiCode);
                    // console.log('This is the Control response')
                    // console.log(citiCode);
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

                    // console.log('This is the Control response')
                    getWeather(vm.citiName);
                    getRestInfo(vm.citiName);
                
                     console.log(vm.clickName);
                });
        }
        function getWeather(citiName) {
            //alert('controller working')
            travelFactory
                .getWeather(citiName)
                .then(function (weatherInfo) {
                    // vm.info=true;

                });
        }
        function getRestInfo(citiName) {
            //alert('controller working')
            travelFactory
                .getRestInfo(citiName)
                .then(function (restInfo) {
                    // vm.info=true;
                
                     vm.businesses = restInfo.data.businesses;
                     console.log(vm.test);
                     

                });
        }

        function passArray() {
            
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
// var arrayInfo = (response.data.list[0]);
                    // vm.city = arrayInfo.name;
                    // vm.lgnLat = arrayInfo.coord;
                    // vm.lgnLatDisplay = arrayInfo.coord.lat + ', ' + arrayInfo.coord.lon;
                    // vm.currentTemp = arrayInfo.main.temp;
                    // vm.pressure = arrayInfo.main.pressure;
                    // vm.humidity = arrayInfo.main.humidity;
                    // vm.lowTemp = arrayInfo.main.temp_min;
                    // vm.highTemp = arrayInfo.main.temp_max;
                    // vm.windSpeed = arrayInfo.wind.speed;
                    // var icon = arrayInfo.weather[0].icon;
                    // vm.iconImage = 'http://openweathermap.org/img/w/' + icon + '.png';
                    // vm.show = true;  
                    // console.log('Here is the weather information we can use:')                 
                    // console.log(response);