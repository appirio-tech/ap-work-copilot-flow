(function () {
  'use strict';

  angular
    .module('example')
    .controller('ExampleController', ExampleController);

  ExampleController.$inject = ['$scope', 'AuthService'];

  function ExampleController($scope, AuthService) {
    var vm = this;

  }
})()