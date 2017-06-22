(function(){
    'use strict';

    angular
        .module('app')
        .controller('TravelController', TravelController)

    TravelController.$inject = [''];

    function TravelController() {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { }
    }
})();