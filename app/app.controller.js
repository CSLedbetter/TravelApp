(function () {
    'use strict';

    angular
        .module('app')
        .controller('TravelController', TravelController)

    TravelController.$inject = [];

    function TravelController() {

        var vm = this;
        vm.show = false;
        vm.click = click;

        function click() {
        
            vm.show = true;
        };
    }
})();