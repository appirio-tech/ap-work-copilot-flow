(function () {
  'use strict';

  angular
    .module('app.projects')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['workRequests', '$state'];
  /* @ngInject */
  function ProjectsController(workRequests, $state) {
    var vm = this;
    vm.title = 'View Projects';
    vm.highlightAssignedButton = true;
    vm.highlightOpenButton = false;
    vm.active = null;
    vm.workRequests = workRequests;
    vm.showTypeFilterMenu = false;
    vm.typeFilterValue = null;
    vm.reverse = true;
    vm.selectedType = 'All Project Types';
    vm.filterMatches = [];

    vm.activate = function() {
      vm.workRequests = workRequests;
    };

   vm.typeFilters = ["All Project Types", "Design", "Development", "Design & Development"]
   vm.filteredRequests = {"code": "Development", "design": "Design", "both": "Design & Development" }

    vm.hoverSelect = function(index) {
      vm.active = index;
    }

    vm.hoverDeselect = function(index) {
      vm.active = null;
    }

    vm.assignedButtonSelected = function() {
      vm.highlightOpenButton = false;
      vm.highlightAssignedButton = true;
    }

    vm.openButtonSelected = function() {
      vm.highlightAssignedButton = false;
      vm.highlightOpenButton = true;
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

    vm.reverseOrder = function() {
      vm.reverse = !vm.reverse
    }

    vm.activate();

  }
})();
