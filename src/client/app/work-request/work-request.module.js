(function () {
  'use strict';

  angular
    .module('app.workRequest', [
      'blocks.exception', 'blocks.logger',
      'app.resource',
      'app.constants'
    ])
    .run(WorkRequest);

  WorkRequest.$inject = ['ApiResource'];

  function WorkRequest(ApiResource) {
    var config = {
      url: 'app-work-requests/:id',
      resource: 'work-request'
    };

    ApiResource.add(config);
  }
})();
