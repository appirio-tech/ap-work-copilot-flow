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
      vm.copilotAssignedProjects = vm.formatWorkRequests(copilotAssignedProjects);
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

    vm.activate();

  }
})();
