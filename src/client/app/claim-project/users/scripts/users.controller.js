/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.claim-project')
    .controller('SubmitUsersController', SubmitUsersController);

  SubmitUsersController.$inject = ['$scope', 'logger', 'ClaimProjectService', 'NavService'];

  function SubmitUsersController($scope, logger, ClaimProjectService, NavService) {
    var vm   = this;
    vm.title = 'Users';
    vm.work  = ClaimProjectService.work;
    vm.submit;

    vm.submit = function () {
      if ($scope.usersForm.$valid) {
        NavService.setNextState();
      }
    };

    $scope.$watch('usersForm', function(usersForm) {
      if (usersForm) {
        NavService.findState('users').form = usersForm;
      }
    });
  }
})();
