(function() {
  'use strict';

  angular
    .module('ap-copilot-flow.project-details')
    .filter('status', StatusFilter);

  StatusFilter.$inject = [];

  function StatusFilter() {
    return function(input) {
     input = input || '';
     var typeDisplays = {
       'Assigned': 'Claimed',
       'Estimate'  : 'Estimated'
     };

     return typeDisplays[input] || input;
    };
  }
})();