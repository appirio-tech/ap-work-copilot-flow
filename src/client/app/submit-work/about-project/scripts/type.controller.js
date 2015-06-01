(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitTypeController', SubmitTypeController);

  SubmitTypeController.$inject = ['$scope', '$state', 'logger', 'SubmitWorkService', 'NavService'];

  function SubmitTypeController($scope, $state, logger, SubmitWorkService, NavService) {
    var vm   = this;
    vm.title = 'Add Challenges';
    vm.challenges = [{id: 0, requestType: null, risk: null, description: null}];
    vm.showChallengesAdded = false;
    vm.submit;

    vm.addChallenge = function($index, challenge) {
      var challengeId = $index + 1;
      vm.challenges.push({id: challengeId, requestType: null, risk: null, description: null});
    }

    vm.removeChallenge = function(index) {
      if (vm.challenges.length > 1) {
        vm.challenges.splice(index, 1);
      }
  }

    vm.submit = function(form) {
      console.log('challenges array', vm.challenges)
      SubmitWorkService.challenges = vm.challenges;
      vm.showChallengesAdded = true;
    };
  }
})();
