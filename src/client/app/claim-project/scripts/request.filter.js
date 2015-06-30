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
       'claimed': 'Awaiting Estimates',
       'estimated'  : 'Awaiting Approval',
       'approved': 'Approved',
       'launched': 'Launched'
     };

     return typeDisplays[input]
    };
  }
})();