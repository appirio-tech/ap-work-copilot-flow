/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.claim-project')
    .controller('LaunchController', LaunchController);

  LaunchController.$inject = ['$scope', 'logger', 'ClaimProjectService'];

  function LaunchController($scope, logger, ClaimProjectService) {
    var vm     = this;
    vm.title   = 'Launch';
    vm.appName = '';
    vm.work    = ClaimProjectService.work;
    vm.add;
    vm.submit;
  }
})();
