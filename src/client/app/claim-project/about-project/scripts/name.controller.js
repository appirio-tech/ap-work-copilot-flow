/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.claim-project')
    .controller('SubmitNameController', SubmitNameController);

  SubmitNameController.$inject = ['$scope', '$state', 'ClaimProjectService', 'NavService'];

  function SubmitNameController($scope, $state, ClaimProjectService, NavService) {
    var vm   = this;
    vm.title = 'Claim Project';
    vm.submit;

    vm.submit = function () {
      $state.go('claim-project.type')
    };

  }
})();

