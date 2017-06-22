(function(){
    'use strict';

    angular
        .module('app')
        .factory('TravelFactory', TravelFactory)

    TravelFactory.$inject = ['$http'];

    function TravelFactory($http) {
        var service = {
            getFlightData: getFlightData
        };

        return service;

        function getFlightData() { 
            return $http
                .get('')
                .then(function(){

                })

        }
    }
})();

// rapid.call('RapidAPI', 'getAll', {'{}'});
