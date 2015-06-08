(function () {
  'use strict';

  angular
    .module('app.projects')
    .controller('AssignedProjectsController', AssignedProjectsController);

  AssignedProjectsController.$inject = ['copilotAssignedProjects', '$state'];
  /* @ngInject */
  function AssignedProjectsController(copilotAssignedProjects, $state) {
    var vm = this;
    vm.title = 'View Assigned Projects';
    vm.copilotAssignedProjects = copilotAssignedProjects;

    vm.activate = function() {
      console.log('the copilot projects fr cntrl', vm.copilotAssignedProjects)
    //   vm.workRequests = vm.formatWorkRequests(workRequests);
    // };

    // vm.formatWorkRequests = function(requests) {
    //   var typeDisplays = {
    //     'design': 'Mobile: Design',
    //     'code'  : 'Mobile: Code',
    //     'design & code': 'Design & Code'
    //   };

      // return requests.map(function(work) {
      //   work.requestType = typeDisplays[work.requestType];
      //   return work;
      // });
    };

    vm.activate();

  }
})();
