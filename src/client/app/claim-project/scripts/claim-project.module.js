(function () {
  'use strict';

  angular.module('app.claim-project', [
    'app.core',
    'app.user',
    'app.constants',
    'app.resource',
    'app.workRequest',
    'duScroll'
  ])

  // .run(claimProject);

  // claimProject.$inject = ['ApiResource'];

  // function claimProject(ApiResource) {
  //   var config = {
  //   url: 'copilots/copilot-b/projects/',
  //   resource: 'copilot-assigned-projects',
  //   apiUrl: 'http://localhost:8010/'
  // };

  //   ApiResource.add(config);
  // }

})();
