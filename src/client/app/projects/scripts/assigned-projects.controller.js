(function () {
  'use strict';

  angular
    .module('app.projects')
    .controller('AssignedProjectsController', AssignedProjectsController);

  AssignedProjectsController.$inject = ['copilotAssignedProjects', '$state'];
  /* @ngInject */
  function AssignedProjectsController(copilotAssignedProjects, $state) {
    var vm = this;
    vm.title = 'View Projects';
    vm.copilotAssignedProjects = [];
    vm.formatWorkRequests = null;
    vm.active = null;

    vm.activate = function() {
      vm.copilotAssignedProjects = copilotAssignedProjects;
    };

    vm.hoverSelect = function(index) {
      vm.active = index;
    }

    vm.hoverDeselect = function(index) {
      vm.active = null;
    }

    vm.assignedButtonSelected = function() {
      vm.highlightAssignedButton = true;
      vm.highlightOpenButton = false;
    }

    vm.openButtonSelected = function() {
      vm.highlightAssignedButton = false;
      vm.highlightOpenButton = true;
    }

    vm.activate();

  }
})();
