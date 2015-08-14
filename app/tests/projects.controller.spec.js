'use strict';

describe('ProjectsController', function () {
  var controller, flush, scope, stateSpy, state, workRequests;

  beforeEach(function () {
    bard.inject(this, '$q', '$controller', '$rootScope', 'ProjectsService', '$state');
    flush = function() {$rootScope.$apply()}
    scope = $rootScope.$new();

    bard.mockService(ProjectsService, {
      _default: $q.when({})
    });
    bard.mockService($state, {
      _default: $q.when({})
    });

    controller = $controller('ProjectsController');
    flush();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Projects Controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    it ('should select projects by type', function() {
      controller.selectType('Design')
      expect(controller.typeFilterValue).to.equal('Design')
    })

    it ('should filter projects by type', function() {
      controller.selectedType = 'Development'
      expect(controller.typeFilter({requestType: 'code'})).to.equal(true);
    })

  it ('should show detail span if passed the correct state', function() {
    $state.current.name = 'assigned'
    expect(controller.showDetailSpan('assigned')).to.be.true
  })
  });
});