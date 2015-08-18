(function() {
'use strict';

angular
  .module('ap-copilot-flow.project-details')
  .controller('ProjectDetailsController', ProjectDetailsController);

ProjectDetailsController.$inject = ['$scope', '$window', 'ProjectDetailsService', '$state', 'UserV3Service', 'ProjectsService'];

function ProjectDetailsController ($scope, $window, ProjectDetailsService, $state, UserV3Service, ProjectsService) {
  var vm = this;
  vm.loading = true;
  vm.userId = null;
  vm.work  =  null;
  vm.showClaimedModal = false;
  vm.showLaunchButton = false;
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
    var claimedProjectStatuses = [
      'Assigned',
      'Estimate',
      'Approved',
      'awaiting_launch',
      'Launched'
    ]
    if (vm.work) {
      return claimedProjectStatuses.indexOf(vm.work.status) <  0;
    }
  }

  vm.hideClaimedModal = function() {
    vm.showClaimedModal  = false;
  }

  vm.openCreateChallenges = function() {
    $window.open('https://www.topcoder.com/direct/home.action', '_blank');
    vm.showLaunchButton = true;
  }

  vm.hideCreateChallengesModal = function() {
    vm.showCreateChallengesModal = false;
  }

  vm.launchProject = function() {
    var body = {
      id: vm.work.id,
      estimate: vm.work.estimate,
      status: "launched"
    }

      var params = {workId: vm.work.id, userId: vm.userId}

      if (vm.userId) {
        var resource = ProjectDetailsService.put(params, body);
        resource.$promise.then(function(data) {
          console.log('estimates created', data)
          vm.work = data;
          vm.showLaunchButton = true;
        })
        resource.$promise.catch(function(data) {
          console.log('error on launch project', data)
        })
      }
  }

  vm.showStatusComponent = function(status) {
    if (vm.work) {
      return vm.work.status == status;
    }
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