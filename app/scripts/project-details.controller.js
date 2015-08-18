(function() {
'use strict';

angular
  .module('ap-copilot-flow.project-details')
  .controller('ProjectDetailsController', ProjectDetailsController);

ProjectDetailsController.$inject = ['$rootScope', '$window', 'ProjectDetailsService', '$state', 'UserV3Service'];

function ProjectDetailsController ($rootScope, $window, ProjectDetailsService, $state, UserV3Service) {
  var vm = this;
  vm.loading = true;
  vm.userId = null;
  vm.work  =  data;
  vm.showClaimedModal = false;
  vm.showCreateChallengesModal = false;
  vm.showEstimatesButton = false;
  vm.threadId = null;

  //event listener for displaying modal
  // $rootScope.$on('projectClaimed', function() {
  //  vm.showClaimedModal = true;
  //  vm.showEstimatesButton = true;
  // });

  vm.submitClaim = function() {
    if (vm.userId) {
    var body = {id: vm.work.id};
    var params = {userId: vm.userId};
      var resource = ProjectDetailsService.post(params, body);
      resource.$promise.then(function(data) {
        vm.work = data;
        vm.showClaimedModal = true;
      })
    }
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

  vm.navigateMessaging = function() {
    $state.go('copilot-messaging', {id: $state.params.id})
  }

  function activate() {
    var params = {workId: $state.params.id}
      var resource = ProjectsService.get(params)
      resource.$promise.then(function(data) {
        vm.work = data;
      })
      resource.$promise.catch(function(data) {
        console.log('error retrieving projects', data)
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

  activate()

}
})();