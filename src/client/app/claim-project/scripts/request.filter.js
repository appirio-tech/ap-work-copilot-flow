(function() {
  'use strict';

  angular
    .module('app.claim-project')
    .filter('request', RequestFilter);

  RequestFilter.$inject = [];

  function RequestFilter() {
    return function(input) {
     input = input || '';
     var typeDisplays = {
       'awaiting_estimates': 'Awaiting Estimates',
       'awaiting_approval'  : 'Awaiting Approval',
       'awaiting_challenge_creation': 'Approved',
       'launched': 'Launched'
     };

     return typeDisplays[input]
    };
  }
})();