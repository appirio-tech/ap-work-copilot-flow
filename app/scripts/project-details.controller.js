(function() {
'use strict';

angular
  .module('ap-copilot-flow.project-details')
  .controller('ProjectDetailsController', ProjectDetailsController);

ProjectDetailsController.$inject = ['$rootScope', '$scope', '$window', 'CopilotProjectDetailsAPIService', '$state', 'UserV3Service', 'CopilotProjectsAPIService'];

function ProjectDetailsController ($rootScope, $scope, $window, CopilotProjectDetailsAPIService, $state, UserV3Service, CopilotProjectsAPIService) {
  var vm = this;
  vm.loading = true;
  vm.userId = null;
  vm.work  =  null;
  vm.threadId = null;

  //Action buttons based on project status
  vm.showMessageButton = false;
  vm.showClaimedModal = false;
  vm.showClaimButton = false;
  vm.showEstimatedModal = false;
  vm.showLaunchButton = false;
  vm.showCreateChallengesModal = false;
  vm.showCreateEstimatesButton = false;
  vm.showEstimateButton = false;


  vm.submitClaim = function() {
    if (vm.userId) {
    var body = {id: vm.work.id};
    var params = {userId: vm.userId};
    var resource = CopilotProjectDetailsAPIService.post(params, body);

    resource.$promise.then(function(data) {
      vm.showClaimButton = false;
      vm.showClaimedModal = true;
      vm.showCreateEstimatesButton = true;
      vm.showMessageButton = true;
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
      return claimedProjectStatuses.indexOf(vm.work.status) === -1;
    }
  }

  vm.openCreateChallenges = function() {
    $window.open('https://www.topcoder.com/direct/home.action', '_blank');
    vm.showLaunchButton = true;
  }

  vm.launchProject = function() {
    var body = {
      id: vm.work.id,
      estimate: vm.work.estimate,
      status: "launched"
    }

      var params = {workId: vm.work.id, userId: vm.userId}

      if (vm.userId) {
        var resource = CopilotProjectDetailsAPIService.put(params, body);
        resource.$promise.then(function(data) {
          vm.work = data;
          vm.showLaunchButton = true;
        })
        resource.$promise.catch(function(data) {
          console.log('error on launch project', data)
        })
      }
  }

  vm.navigateMessaging = function() {
    var threadId = "threadfor-" + vm.work.id
    $state.go('copilot-messaging', {id: $state.params.id, threadId: vm.work.threadId})
  }

  function activate() {
    var params = {workId: $state.params.id}
      var resource = CopilotProjectsAPIService.get(params)
      resource.$promise.then(function(data) {
        vm.work = data;

        //Show buttons & banners according to project status
        vm.showMessageButton = true;
        if (vm.work.status === 'Submitted' || vm.projectAvailable()) {
          vm.showClaimButton = true;
          //copilot cannot message if project is unclaimed
          vm.showMessageButton = false;
        } else if (vm.work.status === 'Assigned') {
          vm.showCreateEstimatesButton = true;
        } else if (vm.work.status === 'Estimate') {
          vm.showEstimatedModal = true;
        } else if (vm.work.status === 'Approved') {
          vm.showCreateChallengesButton = true;
        } else if (vm.work.status === 'Launched') {
          vm.showLaunchedModal = true
        }
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

  //event listener for displaying modal
  $rootScope.$on('projectEstimated', function() {
   vm.showEstimatedModal = true;
   vm.showCreateEstimatesButton = false;
  });

  activate()

}
})();