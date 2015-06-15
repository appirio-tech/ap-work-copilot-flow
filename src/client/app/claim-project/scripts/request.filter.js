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
       'design': 'Mobile Design',
       'code'  : 'Mobile Code',
       'design & code': 'Design & Code'
     };

     return typeDisplays[input]
    };
  }
})();