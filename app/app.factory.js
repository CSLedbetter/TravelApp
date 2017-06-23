(function () {
    'use strict';

    angular
        .module('travelApp')
        .factory('travelFactory', travelFactory)

    travelFactory.$inject = ['$http'];

    function travelFactory($http) {
        var service = {
            getFlightCodes: getFlightCodes
            // ,getArrivalData: getArrivalData
        };

        return service;

        function getFlightCodes(response) {
            return $http
                .get('https://iatacodes.org/api/v6/routes?api_key=8ec73afd-8270-4eb4-9db7-c4cab98d01b2&flight_number=UA276')
                .then(function (response) {
                    var citiCode = response.data.response[0].arrival;
                    getArrivalData(citiCode);
                });
        }

        function getArrivalData(citiCode) {
            return $http
                .get('http://services.faa.gov/airport/status/' + citiCode)
                .then(function (response) {
                    var citiName = response.data.city
                    console.log(response);
                    //return response;
                    getRestInfo(citiName);
                });
        }

        function getRestInfo(citiName) {
            return $http
                .get('https://api.yelp.com/v3/businesses/search?term=restaurants&location='+ citiName + '&sort_by=rating', {
                    headers: {
                        'Authorization': 'Bearer cBGBDuqc1jCkQWfbTTrGw4ZII348RHKnf-OIwNPLvfq4gZ02vH8PcWY2g61PWOKnealVZK6VK7SXWEfIeQK_C8-BwBlu0WMuhZSDKzk1mpXWyLGEijDHmbyaIEFNWXYx'
                    }
                })
                .then(function (response) {
                    console.log(response);
                    return response;
                });
        }
    }
})();
