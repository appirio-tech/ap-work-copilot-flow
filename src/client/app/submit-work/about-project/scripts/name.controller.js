/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitNameController', SubmitNameController);

  SubmitNameController.$inject = ['$scope', '$state', 'SubmitWorkService', 'NavService'];

  function SubmitNameController($scope, $state, SubmitWorkService, NavService) {
    var vm   = this;
    vm.title = 'Claim Project';
    vm.submit;

    vm.submit = function () {
      $state.go('submit-work.type')
    };

  }
})();

