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
        url: 'copilot-assigned-projects',
        resource: 'copilot-assigned-projects'
      };

      ApiResource.add(config);
    }
})();
