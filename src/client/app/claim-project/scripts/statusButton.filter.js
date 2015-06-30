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
       'claimed': 'Estimates Required',
       'estimated'  : 'View Details',
       'approved': 'Create Challenges',
       'awaiting_launch': 'Ready to Launch',
       'launched': 'View Details'
     };

     return typeDisplays[input]
    };
  }
})();