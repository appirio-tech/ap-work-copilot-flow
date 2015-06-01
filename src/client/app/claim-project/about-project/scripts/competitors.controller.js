/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.claim-project')
    .controller('SubmitCompetitorsController', SubmitCompetitorsController);

  SubmitCompetitorsController.$inject = ['$scope', 'logger', 'ClaimProjectService', 'NavService'];

  function SubmitCompetitorsController($scope, logger, ClaimProjectService, NavService) {
    var vm     = this;
    vm.title   = 'Competitors';
    vm.appName = '';
    vm.work    = ClaimProjectService.work;
    vm.add;
    vm.submit;

    vm.add = function() {
      if (!(vm.appName.trim().length === 0)) {
        vm.work.competitorApps.push(vm.appName);
        vm.appName = '';
        vm.placeholder = ' ';
      }
    }

    vm.submit = function () {
      if ($scope.competitorForm.$valid) {
        NavService.setNextState();
      }
    };

    $scope.$watch('competitorForm', function(competitorForm) {
      if (competitorForm) {
        NavService.findState('competitors').form = competitorForm;
      }
    });
  }
})();
