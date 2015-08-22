(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.projects')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['$scope', '$resource', '$state', 'UserV3Service', 'ProjectsService'];
  function ProjectsController($scope, $resource, $state, UserV3Service, ProjectsService) {
   var vm = this;
   vm.loading = true;
   vm.workRequests = null;
   vm.title = 'View Projects';
   vm.active = null;
   vm.showTypeFilterMenu = false;
   vm.typeFilterValue = null;
   vm.selectedType = 'All Project Types';
   vm.typeFilters = ["All Project Types", "Design", "Development", "Design & Development"];
   vm.filteredRequests = {"code": "Development", "design": "Design", "both": "Design & Development" };

    vm.hoverSelect = function(index) {
      vm.active = index;
    }

    vm.hoverDeselect = function(index) {
      vm.active = null;
    }

    vm.toggleTypeFilterMenu = function() {
      vm.showTypeFilterMenu = !vm.showTypeFilterMenu;
    }

    vm.selectType = function(item) {
      vm.selectedType = item;
      if (item === 'Design & Development') {
        vm.typeFilterValue = 'Design & Dev';
      } else {
        vm.typeFilterValue = item;
      }
    }

    vm.typeFilter = function(data) {
      if (vm.filteredRequests[data.requestType] ===  vm.selectedType || vm.selectedType === 'All Project Types') {
      return true;
      } else {
        return false;
     }
    }

    vm.showDetailSpan = function(state) {
      return $state.current.name === state
    }

  function activate() {
    var params;
    //check if user is logged in, load assigned or open
    $scope.$watch(UserV3Service.getCurrentUser, function(user) {
      if (user) {
        if ($state.current.name === 'view-projects.open') {
          params = {filter: 'copilotId=unassigned'}
        } else if ($state.current.name === 'view-projects.assigned') {
          params = {filter:'copilotId='+user.id}
        }
      }
      var resource = ProjectsService.query(params)
      resource.$promise.then(function(data) {
        vm.workRequests = data;
        console.log('the  projects', data)
      })
      resource.$promise.catch(function(data) {
        console.log('error retrieving projects', data)
      })
      resource.$promise.finally(function() {
        vm.loading = false;
      })
      });

      }
   activate()

  }
})();