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
    vm.reverse = false;
    vm.selectedType = '';
    vm.filterMatches = [];

    vm.activate = function() {
      vm.workRequests = workRequests;
    };

    vm.typeFilters = ["design", "code", "design & code"];

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
    }

    vm.typeFilter = function(data) {
    if (data.requestType ===  vm.selectedType || vm.selectedType === '') {
      return true;
    } else {
      return false;
    }
    // return true;
    }

    vm.reverseOrder = function() {
      console.log('reversing')
      vm.reverse = !vm.reverse
    }

    vm.activate();

  }
})();
