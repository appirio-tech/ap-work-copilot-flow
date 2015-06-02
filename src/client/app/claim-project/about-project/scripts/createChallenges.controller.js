/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.claim-project')
    .controller('CreateChallengesController', CreateChallengesController);

  CreateChallengesController.$inject = ['$scope', 'logger', '$state', 'ClaimProjectService'];
  /* @ngInject */
  function CreateChallengesController($scope, logger, $state, ClaimProjectService) {
    var vm           = this;
    vm.title         = 'Create Challenges';
  }
})();
