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
    vm.highlightAssignedButton = false;
    vm.highlightOpenButton = true;
    vm.active = null;
    vm.workRequests = [];
    vm.formatWorkRequests = null;

    vm.activate = function() {
      vm.workRequests = vm.formatWorkRequests(workRequests);
    };

    vm.formatWorkRequests = function(requests) {
      var typeDisplays = {
        'design': 'Mobile: Design',
        'code'  : 'Mobile: Code',
        'design & code': 'Design & Code'
      };

      return requests.map(function(work) {
        work.requestType = typeDisplays[work.requestType];
        return work;
      });
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
