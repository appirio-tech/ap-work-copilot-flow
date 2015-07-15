(function() {
  'use strict';

  angular
    .module('ap-copilot-flow.project-details')
    .filter('capitalize', CapitalizeFilter);

  CapitalizeFilter.$inject = [];

  function CapitalizeFilter() {
    return function(input) {
     return input.charAt(0).toUpperCase() +  input.slice(1)
    }
  }
})();