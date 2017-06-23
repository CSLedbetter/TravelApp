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
            //alert('controller working')
            travelFactory
                .getFlightCodes(flightNumber)
                .then(function (citiCode) {

                    getCitiName(citiCode);
                    // console.log('This is the Control response')
                    // console.log(citiCode);
                });
        }
        function getCitiName(citiCode) {

            travelFactory
                .getArrivalData(citiCode)
                .then(function (arrivalAirportInfo) {
                    vm.arrivalAirportInfo = arrivalAirportInfo;
                    // console.log('This is the Control response')
                     console.log(arrivalAirportInfo);
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