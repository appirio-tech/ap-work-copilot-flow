(function () {
  'use strict';

  angular.module('app.claim-project')
    .directive('challenges', challengesDirective);

  challengesDirective.$inject = [];

  function challengesDirective() {
    var directive = {
    restrict: 'E',
     require: '^ngModel',
     controller: challengesController,
     controllerAs: 'vm',
     bindToController: true,
     scope: {
       ngModel: '=', // selection
       challenges: '=',   // items to select from
     },
     link: function(scope, element, attrs) {
            element.on('click', function(event) {
              event.preventDefault();
            });
            scope.default = 'Please select item';
            // selection changed handler
            scope.select = function(item) {
              console.log('SELECTED')
              scope.ngModel = item;
              if (scope.callback) {
                scope.callback({ item: item });
              }
            };
          },
              templateUrl: '../views.challenges.html'
     };

    return directive;
  }
  })();