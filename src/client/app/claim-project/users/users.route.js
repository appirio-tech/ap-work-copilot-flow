(function () {
  'use strict';

  angular
    .module('app.claim-project')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'users',
        config: {
          url: '/claim-project/users',
          templateUrl: 'claim-project/users/views/users.html',
          controller: 'SubmitUsersController',
          controllerAs: 'vm',
          title: 'Users',
          settings: {}
        }
      }
    ];
  }
})();
