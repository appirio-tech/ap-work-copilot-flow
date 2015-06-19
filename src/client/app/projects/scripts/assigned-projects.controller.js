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
    vm.copilotAssignedProjects = [];
    vm.formatWorkRequests = null;
    vm.id = 0;
    vm.active = null;

    vm.activate = function() {
      vm.copilotAssignedProjects = copilotAssignedProjects
    };

    vm.hoverSelect = function(index) {
      vm.active = index;
    }

    vm.hoverDeselect = function(index) {
      vm.active = null;
    }


    vm.activate();

  }
})();
