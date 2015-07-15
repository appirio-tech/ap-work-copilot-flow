// /* jshint -W117, -W030 */
'use strict';
describe('ProjectsController', function () {
  var controller, flush, scope, stateSpy, state, workRequests;

  beforeEach(function () {
    // bard.appModule('ap-copilot-flow.projects')
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

  context('when current state is "assigned"', function() {
    it ('should include project status in route', function() {
      $state.current.name = 'view-projects.assigned'
      controller.viewProjectDetails({id: '123', status: 'approved'})
      expect($state.go).to.have.been.calledWith('project-details', {id: '123', status: 'approved'});
    })
  });

  context('when current state is "open"', function() {
    it ('should not include project status in route', function() {
      $state.current.name = 'view-projects.open'
      controller.viewProjectDetails({id: '123', status: 'approved'})
      expect($state.go).to.have.been.calledWith('project-details', {id: '123'});
    })
  });
  });
});