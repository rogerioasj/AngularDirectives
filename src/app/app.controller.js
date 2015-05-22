(function () {
  'use strict';
  
  angular
    .module('directives')
    .controller('AppController', AppController);
    
    AppController.$inject = ['$scope'];
    function AppController($scope) {
      var vm = this;
      vm.size = 100;  
      vm.sizeUp = sizeUp;
      vm.sizeDown = sizeDown;
      return vm;
      
      /////////////////////////////////
          
      function sizeUp() {
        vm.size += 10;
      }
      
      function sizeDown() {
        vm.size -= 10;
      }    
    }
}());