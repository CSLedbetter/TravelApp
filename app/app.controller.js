(function () {
    'use strict';

    angular
        .module('travelApp')
        .controller('travelCtrl', travelCtrl)

    travelCtrl.$inject = ['travelFactory'];

    function travelCtrl(travelFactory) {
        var vm = this;
         vm.show = false;
        vm.click = click;
        onActivate();

        function onActivate (){
            travelFactory
                .getFlightCodes()
                .then(function(cityCode){
                    vm.cityCode = cityCode;
                    //console.log(pokemon);
                });
        }

        function click() {
        
            vm.show = true;
        };
    }
})();