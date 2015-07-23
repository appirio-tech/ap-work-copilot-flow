(function() {
'use strict';

angular
  .module('ap-copilot-flow.project-details')
  .controller('ProjectDetailsController', ProjectDetailsController);

ProjectDetailsController.$inject = ['$rootScope', '$window', 'ProjectDetailsService', '$state', 'UserV3Service'];

function ProjectDetailsController ($rootScope, $window, ProjectDetailsService, $state, UserV3Service) {
  var vm = this;
  vm.work  =  null;
  vm.showClaimedModal = false;
  vm.showCreateChallengesModal = false;
  vm.showEstimatesButton = false;
  vm.threadId = null;

  //event listener for displaying modal
  $rootScope.$on('projectClaimed', function() {
   vm.showClaimedModal = true;
   vm.showEstimatesButton = true;
  });

  vm.submitClaim = function() {
    var projectId = vm.work.id;
    ProjectDetailsService.submitClaim(projectId);
  }

  vm.projectAvailable = function() {
    //TODO: Eliminate incomplete once only submitted return
    return ProjectDetailsService.projectAvailable(vm.work, vm.work.id);
  }

  vm.hideClaimedModal = function() {
    vm.showClaimedModal  = false;
  }

  vm.openCreateChallenges = function() {
    $window.open('https://www.topcoder.com/direct/home.action', '_blank');
    ProjectDetailsService.openCreateChallenges(vm.work.id);
  }

  vm.hideCreateChallengesModal = function() {
    vm.showCreateChallengesModal = false;
  }

  vm.launchProject = function() {
    return ProjectDetailsService.launchProject(vm.work.id);
  }

  vm.showStatusComponent = function(status) {
    return ProjectDetailsService.showStatusComponent(vm.work.id, status);
  }

  vm.activate = function() {
  //instantiate userId for messaging's subscriberId
  // vm.userId = UserV3Service.getCurrentUser().id;
    if ($state.params.status) {
      ProjectDetailsService.initializeCopilotWork($state.params.id, $state.params.status).then(function(data) {
        vm.work = data;
      })
    } else {
      ProjectDetailsService.initializeCopilotWork($state.params.id).then(function(data) {
        console.log('le data', data)
        vm.work = data;
      })
    }
  }

  vm.activate()

}
})();