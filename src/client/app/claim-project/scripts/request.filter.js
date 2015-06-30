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
       'claimed': 'Claimed',
       'estimated'  : 'Estimated',
       'approved': 'Approved',
       'launched': 'Launched'
     };

     return typeDisplays[input]
    };
  }
})();