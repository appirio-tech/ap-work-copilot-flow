(function() {
  'use strict';

  angular
    .module('app.claim-project')
    .filter('statusButton', StatusButtonFilter);

  StatusButtonFilter.$inject = [];

  function StatusButtonFilter() {
    return function(input) {
     input = input || '';
     var typeDisplays = {
       'awaiting_estimates': 'Estimates Required',
       'awaiting_approval'  : 'View Details',
       'awaiting_challenge_creation': 'Create Challenges',
       'launched': 'View Details'
     };

     return typeDisplays[input]
    };
  }
})();