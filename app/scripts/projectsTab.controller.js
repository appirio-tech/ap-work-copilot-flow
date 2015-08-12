(function () {
  'use strict';

  angular
    .module('ap-copilot-flow.projects')
    .controller('ProjectsTabController', ProjectsTabController);

  ProjectsTabController.$inject = ['$state'];
  function ProjectsTabController($state) {
    var vm = this;
    vm.highlightAssignedButton = null;
    vm.highlightOpenButton = null;

    function activate() {
      if ($state.current.name == 'view-projects.open') {
        vm.highlightAssignedButton = false;
        vm.highlightOpenButton = true;
      } else if ($state.current.name == 'view-projects.assigned') {
        vm.highlightAssignedButton = true;
        vm.highlightOpenButton = false;
      }
    }

    vm.assignedButtonSelected = function() {
      vm.highlightOpenButton = false;
      vm.highlightAssignedButton = true;
    }

    vm.openButtonSelected = function() {
      vm.highlightAssignedButton = false;
      vm.highlightOpenButton = true;
    }

    activate();

  }
})();