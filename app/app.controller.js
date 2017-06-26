(function () {
    'use strict';
var restaurants={};

    angular
        .module('travelApp')
        .controller('travelCtrl', travelCtrl)

    travelCtrl.$inject = ['travelFactory'];

    function travelCtrl(travelFactory) {
        var vm = this;
        vm.show = false;
        vm.info = false;
        vm.restInfo = false;
        vm.click = click;
        vm.toggle = false;
        vm.onActivate = onActivate;
        vm.getOneRestInfo = getOneRestInfo;
        vm.initMap = initMap;

        function onActivate(flightNumber) {
            travelFactory
                .getFlightCodes(flightNumber)
                .then(function (response) {
                    vm.info=true;
                    var arrivalCityCode = response.data.response[0].arrival;
                    var departCityCode =  response.data.response[0].departure;
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
                    if (vm.arrivalAvgDelay == "") {vm.arrivalAvgDelay = "None"}
                    vm.arrivalClosure = arrivalAirportInfo.data.status.closureBegin;
                    if (vm.arrivalClosure == "") {vm.arrivalClosure = "None"}
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
                    vm.departAvgDelay = departAirportInfo.data.status.avgDelay;
                    if (vm.departAvgDelay == "") {vm.departAvgDelay = "None"}
                    vm.departClosure = departAirportInfo.data.status.closureBegin;
                    if (vm.departClosure == "") {vm.departClosure = "None"}
                    vm.departReason = departAirportInfo.data.status.reason;
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
            travelFactory
                .getRestInfo(citiName)
                .then(function (restInfo) {
                    // vm.info=true;
                     vm.businesses = restInfo.data.businesses;
                     restaurants = restInfo.data.businesses;
                });
        }
        function getOneRestInfo(index) {
            var pickRestaurant = restaurants[index];
            vm.restName = pickRestaurant.name;
            vm.phone =  pickRestaurant.phone;
            vm.price = pickRestaurant.price;
            vm.rating = pickRestaurant.rating;
            vm.coordinates = pickRestaurant.coordinates;
            vm.url  = pickRestaurant.url;
            vm.catagories = pickRestaurant.catagories;
            vm.address = pickRestaurant.location.display_address;
            vm.zip = pickRestaurant.location.zip_code;
            vm.image = pickRestaurant.image_url;
            vm.restInfo = true;
        }
        // click function to show flight info
        function click() {

            vm.info = true;
        };
        function initMap() {
            var uluru = {lat: -25.363, lng: 131.044};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: uluru
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
        }

    }
})();
                    