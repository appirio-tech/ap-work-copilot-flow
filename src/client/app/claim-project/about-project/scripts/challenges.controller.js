(function () {
  'use strict';

  angular
    .module('app.claim-project')
    .controller('SubmitChallengesController', SubmitChallengesController);

  SubmitChallengesController.$inject = ['$scope', '$state', 'logger', 'ClaimProjectService'];

  function SubmitChallengesController($scope, $state, logger, ClaimProjectService) {
    var vm   = this;
    vm.title = 'Add Challenges';
    vm.challenges = [];
    vm.overallDifficulty = null;
    vm.showChallengesAdded = false;
    vm.index = 0;
    vm.challenge = {id: vm.index, requestType: null, risk: null, description: null, count: null}
    vm.submit;

    vm.addChallenge = function(challenge) {
      var challengeId = vm.index++;
      vm.challenges.push(vm.challenge);
      vm.challenge = {id: vm.index, requestType: null, risk: null, description: null, count: null}
    }

    vm.removeChallenge = function(index) {
        vm.challenges.splice(index, 1);
    }

    vm.submit = function(form) {
      ClaimProjectService.challenges = vm.challenges;
      vm.showChallengesAdded = true;
    };
  }
})();
