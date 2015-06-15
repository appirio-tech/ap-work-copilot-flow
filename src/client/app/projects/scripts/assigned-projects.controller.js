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

    vm.activate = function() {
      vm.copilotAssignedProjects = copilotAssignedProjects;
    };

    vm.activate();

  }
})();
