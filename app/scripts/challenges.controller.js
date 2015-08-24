(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.project-details')
    .controller('ChallengesController', ChallengesController);

  ChallengesController.$inject = ['$state', '$scope', '$rootScope', 'CopilotProjectDetailsService', 'UserV3Service', 'ProjectsService'];

  function ChallengesController($state, $scope, $rootScope, CopilotProjectDetailsService, UserV3Service, ProjectsService) {
    var vm   = this;
    vm.work = null;
    vm.title = 'Challenge Estimates';
    vm.userId = null;
    vm.showAddedChallenges = false;

    //initialize challenges and estimates menus
    vm.challengeTypes = ['Design', 'Code'];
    vm.challengeCounts = [1, 2, 3, 4];
    vm.challengeDifficulties = ['low', 'medium', 'high']
    vm.showTypeMenu = false;
    vm.showCountMenu = false;
    vm.showCountMenu = false;
    vm.estimatesSubmitted = false;
    vm.challenges = [];
    vm.overallDifficulty = null;
    vm.difficultyExplanation = null;
    vm.index = 0;
    vm.challenge = {id: vm.index, challengeType: null, count: null};

    vm.toggleMenu = function(menu) {
      vm[menu] = !vm[menu];
    }

    vm.selectType = function(item) {
      vm.challenge.challengeType = item;
      vm.toggleMenu('showTypeMenu');
    }

    vm.selectCount= function(item) {
      vm.challenge.count = item;
      vm.toggleMenu('showCountMenu');
    }

    vm.selectDifficulty= function(item) {
      vm.overallDifficulty = item;
      vm.toggleMenu('showDifficultyMenu');
    }

    vm.addChallenge = function(challenge) {
      if (vm.challenge.challengeType && vm.challenge.count) {
        var challengeId = vm.index++;
        vm.challenges.push(vm.challenge);
        vm.challenge = {id: vm.index, challengeType: null, count: null}
      }
    }

    vm.removeChallenge = function(index) {
        vm.challenges.splice(index, 1);
    }

    vm.submit = function() {
      var challengesEstimate = {
        complexity: vm.overallDifficulty,
        difficultyExplanation: vm.difficultyExplanation,
        challengeEstimates: vm.challenges
      }

      var body = {id: vm.work.id, estimate: challengesEstimate, status: "estimated"};

      var params = {projectId: vm.work.id, userId: vm.userId};

      if (vm.userId) {
        var resource = CopilotProjectDetailsService.put(params, body);
        resource.$promise.then(function(data) {
          vm.showAddedChallenges = true;
          vm.work = data;
          $rootScope.$broadcast('projectEstimated')
        })
        resource.$promise.catch(function(data) {
          console.log('error on estimates', data);
        })
      }
    };

    function activate() {
      var params = {workId: $state.params.id}
        var resource = ProjectsService.get(params)
        resource.$promise.then(function(data) {
          vm.work = data;
        })
        resource.$promise.catch(function(data) {
          console.log('error retrieving project', data)
        })
        resource.$promise.finally(function() {
          vm.loading = false;
        })

    }

    $scope.$watch(UserV3Service.getCurrentUser, function(user) {
      if (user) {
        vm.userId = user.id;
      }
    })

    activate();

    }
  })();
