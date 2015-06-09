(function () {
  'use strict';

  angular
    .module('app.projects')
    .controller('AssignedProjectsController', AssignedProjectsController);

  AssignedProjectsController.$inject = ['copilotAssignedProjects', '$state'];
  /* @ngInject */
  function AssignedProjectsController(copilotAssignedProjects, $state) {
    var vm = this;
    vm.title = 'Work Requests';
    vm.workRequests = [];
    vm.newProject = null;
    vm.formatWorkRequests = null;
    vm.go = null;
    vm.showMessage = false;

    vm.activate = function() {
      vm.copilotAssignedProjects = vm.formatProjects(copilotAssignedProjects);
      vm.showMessage = false;
    };

   vm.formatProjects= function(requests) {
     var statusClasses = {
       'Incomplete': 'incomplete',
       'Submitted' : 'submitted'
     };
     var statusMessages = {
       'Incomplete': 'PROJECT SUBMISSION INCOMPLETE',
       'Submitted' : 'PROJECT SUBMITTED'
     };
     var checkmarks = {
       'Submitted': 'check-solid-blue.svg',
     };
     var typeDisplays = {
       'design': 'Mobile: Design',
       'code'  : 'Mobile: Code',
       'design & code': 'Design & Code'
     };

     return requests.map(function(work) {
       work.status      = work.status || 'Incomplete';
       work.class       = statusClasses[work.status];
       work.message     = statusMessages[work.status];
       work.checkmark   = checkmarks[work.status];
       work.requestType = typeDisplays[work.requestType];
       return work;
     });
   };

    vm.activate();

  }
})();
