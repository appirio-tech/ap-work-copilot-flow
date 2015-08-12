'use strict';
angular.module('ap-copilot-flow.project-details')
.controller('CopilotMessagingController', CopilotMessagingController);

CopilotMessagingController.$inject = ['$state', '$window', 'UserV3Service', '$scope'];
function CopilotMessagingController ($state, $window, UserV3Service, $scope) {
  var vm;
  vm = this;
  vm.threadId = $state.params.id;
  vm.subscriberId = null;
  vm.back = function() {
      $state.go('project-details', {id: $state.params.id});
  };
  $scope.$watch(UserV3Service.getCurrentUser, function() {
    var user = UserV3Service.getCurrentUser();
    if (user) {
     vm.subscriberId = user.id;
    }
  });
  return vm;
};