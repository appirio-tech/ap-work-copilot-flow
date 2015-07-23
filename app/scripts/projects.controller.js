(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.projects')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['ProjectsService', '$state'];
  function ProjectsController(ProjectsService, $state) {
   var vm = this;
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

    vm.viewProjectDetails = function(project) {
      if ($state.current.name === 'view-projects.assigned') {
        $state.go('project-details', {id: project.id, status: project.status})
      } else if ($state.current.name === 'view-projects.open') {
        $state.go('project-details', {id: project.id})
      }
    }

    function activate() {
      if ($state.current.name === 'view-projects.open') {
        ProjectsService.getWorkRequests().then(function(data) {
          vm.workRequests = data
        })
       } else if ($state.current.name === 'view-projects.assigned') {
        ProjectsService.getAssignedProjects().then(function(data) {
          vm.workRequests = data
        })
      }
    }

    activate()
  }
})();
