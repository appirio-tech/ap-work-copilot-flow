'use strict';

describe ('ProjectsTabController', function () {
  var controller, flush, scope, state

  beforeEach(function () {
    bard.inject(this, '$rootScope', '$controller', '$q', '$state');
    flush = function() {$rootScope.$apply()}
    scope = $rootScope.$new();

    bard.mockService($state, {
      _default: $q.when({}),
      current: {name: 'view-projects.assigned'}
    });

    controller = $controller('ProjectsTabController');
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Projects Tab Controller', function () {
    it('should select assigned button if current state is assigned', function () {
      expect(controller.highlightAssignedButton).to.be.true;
    });

    it('should not select open button if current state is not open', function () {
      expect(controller.highlightOpenButton).to.be.false;
    });

    it('should select assigned button if assigned is clicked', function () {
      controller.assignedButtonSelected()
      expect(controller.highlightAssignedButton).to.be.true;
    });

    it('should select open button if open is clicked', function () {
      controller.openButtonSelected()
      expect(controller.highlightOpenButton).to.be.true;
    });
  });
});