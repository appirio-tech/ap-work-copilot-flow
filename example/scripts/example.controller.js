(function () {
  'use strict';

  angular
    .module('example')
    .controller('ExampleController', ExampleController);

  ExampleController.$inject = ['$scope', 'AuthService'];

  function ExampleController($scope, AuthService) {
    var vm = this;

    vm.authenticated = AuthService.isAuthenticated();
    vm.login = function() {
      console.log('logging in', vm.username, vm.password)
      AuthService.login({
        username: vm.username,
        password: vm.password,
        success: function() {
          vm.authenticated = AuthService.isAuthenticated();
          console.log('authenticated')
        },
        error: function() {
          console.log('ERROR')
        }
      });
    };
}
})()