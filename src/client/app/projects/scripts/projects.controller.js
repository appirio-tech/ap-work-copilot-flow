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
    vm.reverse = false;
    vm.selectedType = 'All Project Types';
    vm.filterMatches = [];

    vm.activate = function() {
      vm.workRequests = workRequests;
    };

    vm.typeFilters = ["All Project Types", "design", "code", "design & code"];

    // vm.formatWorkRequests = function(requests) {
    //   var typeDisplays = {
    //     'design': 'Mobile: Design',
    //     'code'  : 'Mobile: Code',
    //     'design & code': 'Design & Code'
    //   };

    //   return requests.map(function(work) {
    //     work.requestType = typeDisplays[work.requestType];
    //     return work;
    //   });
    // };

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
      vm.typeFilterValue = item;
    }

    vm.typeFilter = function(data) {
    if (data.requestType ===  vm.selectedType ||  vm.selectedType === 'All Project Types') {
      return true;
    } else {
      return false;
    }
    // return true;
    }

    vm.reverseOrder = function() {
      vm.reverse = !vm.reverse
    }

    vm.activate();

  }
})();
