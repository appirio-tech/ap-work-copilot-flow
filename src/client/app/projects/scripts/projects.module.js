(function () {
  'use strict';

  angular
    .module('app.projects', [
      'app.core',
      'app.resource',
      'app.workRequest',
      'ngSanitize'
    ])
    .run(Projects);

    Projects.$inject = ['ApiResource'];

    function Projects(ApiResource) {
      var config = {
      url: 'copilots/copilot-b/projects',
      resource: 'copilot-assigned-projects',
      apiUrl: 'http://localhost:8010/'
    };

      ApiResource.add(config);
    }
})();
