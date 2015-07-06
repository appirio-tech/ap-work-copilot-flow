(function() {
  'use strict';

  angular
    .module('app.project-details')
    .filter('status', StatusFilter);

  StatusFilter.$inject = [];

  function StatusFilter() {
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