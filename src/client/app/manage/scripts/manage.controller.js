(function () {
  'use strict';

  angular
    .module('app.manage')
    .controller('ManageController', ManageController);

  ManageController.$inject = ['workRequests', '$state'];
  /* @ngInject */
  function ManageController(workRequests, $stat) {
    var vm = this;
    vm.title = 'View Projects';
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

    vm.activate();

  }
})();
