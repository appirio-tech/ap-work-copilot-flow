(function () {
  'use strict';

  /* @ngInject */
  function appRun(routerHelper) {
    var otherwise = '/404';
    routerHelper.configureStates(getStates(), otherwise);
  }

  appRun.$inject = ['routerHelper'];

  function getStates() {
    return [
      {
        state: '404',
        config: {
          url: '/404',
          templateUrl: 'core/404.html',
          title: '404',
          data: {
            noAuthRequired: true
          }
        }
      }
    ];
  }

  angular
    .module('app.core')
    .run(appRun);
})();
