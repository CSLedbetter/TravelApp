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

        function onActivate(flightNumber) {
            travelFactory
                .getFlightCodes(flightNumber)
                .then(function (response) {
                    vm.info=true;
                    var arrivalCityCode = response.data.response[0].arrival;
                    var departCityCode =  response.data.response[0].departure;
                    // console.log(citiCode);
                    // console.log(response);
                    getArrivalCityName(arrivalCityCode);
                    getDepartureCityName(departCityCode);
                });
        }
        function getArrivalCityName(arrivalCityCode) {

            travelFactory
                .getAirportData(arrivalCityCode)
                .then(function (arrivalAirportInfo) {
                    vm.arrivalCityName = arrivalAirportInfo.data.city;
                    vm.arrivalAirportName = arrivalAirportInfo.data.name;
                    vm.arrivalAvgDelay = arrivalAirportInfo.data.status.avgDelay;
                    vm.arrivalReason = arrivalAirportInfo.data.status.reason;

                    
                    getWeather(vm.arrivalCityName);
                    getRestInfo(vm.arrivalCityName);
                });
        }
        function getDepartureCityName(departCityCode) {

            travelFactory
                .getAirportData(departCityCode)
                .then(function (departAirportInfo) {
                    vm.departCityName = departAirportInfo.data.city;
                    vm.departAirportName = departAirportInfo.data.name;
                    vm.departavgDelay = departAirportInfo.data.status.avgDelay;
                    vm.departreason = departAirportInfo.data.status.reason;
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
                     //console.log(restInfo);
                });
        }
        // click function to show flight info
        function click() {

            vm.info = true;
        };
    }

})();
                    