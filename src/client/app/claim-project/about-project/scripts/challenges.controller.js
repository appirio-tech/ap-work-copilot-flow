(function () {
  'use strict';

  angular
    .module('app.claim-project')
    .controller('SubmitChallengesController', SubmitChallengesController);

  SubmitChallengesController.$inject = ['$scope', '$rootScope', '$state', 'logger', 'ClaimProjectService'];

  function SubmitChallengesController($scope, $rootScope, $state, logger, ClaimProjectService) {
    var vm   = this;
    vm.title = 'Add Challenges';
    vm.showTypeMenu = false;
    vm.showCountMenu = false;
    vm.copilotWork = ClaimProjectService.work;
    vm.estimatesSubmitted = false;
    vm.projectEstimateStatus = 'Create Project Estimate';
    vm.challengesEstimate = {};
    vm.challenges = [];
    vm.overallDifficulty = null;
    vm.difficultyExplanation = null;
    // vm.showChallengesAdded = false;
    vm.index = 0;
    vm.challenge = {id: vm.index, challengeType: null, count: null}
    vm.submit;

    //event listeners
  $rootScope.$on('challengeEstimatesSubmitted', function() {
    vm.estimatesSubmitted = true;
    vm.projectEstimateStatus = 'Project Estimate'
  })

  vm.toggleTypeMenu = function() {
    vm.showTypeMenu = !vm.showTypeMenu;
  }

  vm.toggleCountMenu = function() {
    vm.showTypeMenu = false;
    vm.showCountMenu = !vm.showCountMenu;
  }

  vm.challengeTypes = [{type: 'design'}, {type: 'code'}];
  vm.challengeCounts = [{count: 1}, {count: 2}, {count: 3}, {count: 4}]

  vm.selectType = function(item) {
    vm.challenge.challengeType = item.type;
    vm.toggleTypeMenu();
  }

  vm.selectCount= function(item) {
    vm.challenge.challenge.count = item.count;
    console.log('le count', vm.challenge);
    vm.toggleTypeMenu();
  }

    vm.addChallenge = function(challenge) {
        var challengeId = vm.index++;
        vm.challenges.push(vm.challenge);
        vm.challenge = {id: vm.index, challengeType: null, count: null}
    }

    vm.removeChallenge = function(index) {
        vm.challenges.splice(index, 1);
    }

    vm.submit = function(form) {
      var challengesEstimate = {}
      challengesEstimate.complexity = vm.overallDifficulty;
      challengesEstimate.difficultyExplanation = vm.difficultyExplanation;
      challengesEstimate.challengeEstimates = vm.challenges;
      console.log('the challenges estimate', challengesEstimate);
      ClaimProjectService.submitChallenges(vm.copilotWork.id, challengesEstimate);
      // // ClaimProjectService.challenges = vm.challenges;
      // console.log('on submit challenge, copilot work', vm.copilotWork)
      // vm.showChallengesAdded = true;
    };

    vm.showCreateChallengesModal = function() {
      return ClaimProjectService.allowCreateChallenges;
    }

    vm.hideCreateChallengesModal = function() {
      ClaimProjectService.allowCreateChallenges = false;
      vm.revealCreateChallengesButton();
    }


  }
})();
