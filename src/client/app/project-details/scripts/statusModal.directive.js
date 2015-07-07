(function () {
  'use strict';

  var directive = function () {
    var link = function (scope, element, attrs) {
      scope.hideModal = function() {
        element.hide();
      }
    };

    return {
      restrict: 'E',
      link    : link,
      transclude: true,
      scope: {
      },
      templateUrl: function(elem, attr){
      return 'project-details/'+attr.type+'.html';
    }
    };
  };

  directive.$inject = [];

  angular.module('app.project-details').directive('statusModal', directive);
})();
