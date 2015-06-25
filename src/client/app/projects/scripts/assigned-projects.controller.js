(function () {
  'use strict';

  angular
    .module('app.projects')
    .controller('AssignedProjectsController', AssignedProjectsController);

  AssignedProjectsController.$inject = ['copilotAssignedProjects', 'ProjectsService','$state'];
  /* @ngInject */
  function AssignedProjectsController(copilotAssignedProjects, ProjectsService, $state) {
    var vm = this;
    vm.title = 'View Projects';
    vm.showTypeFilterMenu = false;
    vm.copilotAssignedProjects = [];
    vm.formatWorkRequests = null;
    vm.showTypeFilterMenu = false;
    vm.selectedType = 'All Project Types';
    vm.reverse = true;
    vm.id = 0;
    vm.active = null;

    vm.typeFilters = ["All Project Types", "design", "code", "design & code"]

    vm.activate = function() {
      vm.copilotAssignedProjects = copilotAssignedProjects;
    };

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
    }

    vm.typeFilter = function(data) {
      if (data.requestType ===  vm.selectedType || vm.selectedType === 'All Project Types') {
      return true;
      } else {
        return false;
     }
    }

    vm.reverseOrder = function() {
      vm.reverse = !vm.reverse
    }


    vm.activate();

  }
})();
