(function() {
  'use strict';

  angular
    .module('app.claim-project')
    .filter('cutOff', CutOffFilter);

  CutOffFilter.$inject = [];

  function CutOffFilter() {
    return function(input) {
     input = input || '';
     if (input.length >= 20) {
      return input.substr(0, 20)
     } else {
      return input;
     }
    }
  }
})();