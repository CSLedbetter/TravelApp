(function () {
    'use strict';

    angular
        .module('travelApp')
        .factory('travelFactory', travelFactory)

    travelFactory.$inject = ['$http'];

    function travelFactory($http) {
        var service = {
             getFlightCodes: getFlightCodes
            ,getArrivalData: getArrivalData
            ,getRestInfo: getRestInfo
        };

        return service;

        function getFlightCodes(flightNumber) {
            return $http
                .get('https://origin-iatacodes-api.herokuapp.com/api/v6/routes?api_key=8ec73afd-8270-4eb4-9db7-c4cab98d01b2&flight_number='+flightNumber)
                .then(function (response) {
                    var citiCode = response.data.response[0].arrival;
                    //console.log('factory working');
                    // getArrivalData(citiCode);
                    return citiCode;
                });
        }

        function getArrivalData(citiCode) {
            return $http
                .get('http://services.faa.gov/airport/status/' + citiCode)
                .then(function (response) {
                    var citiName = response.data.city
                    // console.log('This is the Information about Airport:')
                    // console.log(response);
                    //return citiName;
                    return response;
                    // getRestInfo(citiName);
                    // getWeather(citiName);
                });
        }
        function getRestInfo(citiName) {
            return $http
                .get('https://origin-yelp-api.herokuapp.com/v3/businesses/search?term=restaurants&location=denver&sort_by=rating', {
                    headers: {
                        'Authorization': 'Bearer cBGBDuqc1jCkQWfbTTrGw4ZII348RHKnf-OIwNPLvfq4gZ02vH8PcWY2g61PWOKnealVZK6VK7SXWEfIeQK_C8-BwBlu0WMuhZSDKzk1mpXWyLGEijDHmbyaIEFNWXYx'
                    }
                })
                .then(function (response) {
                    // console.log('This is the information about the resturaunts from yelp:')
                    // console.log(response);
                   // return response;
                });
        }

        function getWeather(cityName) {
            //alert('getweather function is working');
            return $http
                .get('http://api.openweathermap.org/data/2.5/find?q=' + cityName +
                    '&units=imperial&APPID=0a400011d9062149daf9b1e3ca91d3d1')
                .then(function (response) {
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
                });
          
        }


    }
})();