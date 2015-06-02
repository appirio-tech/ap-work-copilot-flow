/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.claim-project')
    .controller('SubmitClaimController', SubmitClaimController);

  SubmitClaimController.$inject = ['$scope', '$state', 'ClaimProjectService'];

  function SubmitClaimController($scope, $state, ClaimProjectService) {
    var vm   = this;
    vm.title = 'Claim Project';
    vm.submit;

    vm.submit = function () {
      $state.go('claim-project.type')
    };

  }
})();

