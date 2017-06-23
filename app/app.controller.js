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
        vm.clickVid = clickVid
        onActivate();

        function onActivate() {
            travelFactory
                .getFlightCodes()
                .then(function (cityCode) {
                    vm.cityCode = cityCode;
                    //console.log(pokemon);
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