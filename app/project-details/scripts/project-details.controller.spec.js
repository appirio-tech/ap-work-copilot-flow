'use strict';
describe('ProjectDetailsController', function () {
  var controller, flush, scope

  beforeEach(function () {
    bard.inject(this, '$q', '$controller', '$rootScope', 'ProjectDetailsService', 'UserV3Service');
    flush = function() {$rootScope.$apply()}
    scope = $rootScope.$new();
    bard.mockService(ProjectDetailsService, {
      initalizeCopilotWork: $q.when([{id: '123'}]),
      work: {id: '123'},
      _default: $q.when({})
    });
    bard.mockService(UserV3Service, {
      getCurrentUser: $q.when({id: '123'})
    })
    controller = $controller('ProjectDetailsController');
    flush();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Project Details Controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    it ('should submit a claim', function() {
      controller.submitClaim()
      expect(ProjectDetailsService.submitClaim).to.have.been.called;
    })

    it ('should check if a project is available', function() {
      controller.projectAvailable();
      expect(ProjectDetailsService.projectAvailable).to.have.been.called;
    })

    it ('should open new window for creating challenges', function() {
      controller.openCreateChallenges();
      expect(ProjectDetailsService.openCreateChallenges).to.have.been.called;
    })

    it ('should launch a project', function() {
      controller.launchProject();
      expect(ProjectDetailsService.launchProject).to.have.been.called;
    })

    it ('should show any status component', function() {
      controller.showStatusComponent();
      expect(ProjectDetailsService.showStatusComponent).to.have.been.called;
    })

    it ('should create a userId on activate', function() {
      controller.activate();
      flush();
      expect(UserV3Service.getCurrentUser).to.have.been.called;
    })

  context('when project is claimed', function() {
    it ('should show claimed modal', function() {
      scope.$emit('projectClaimed')
      expect(controller.showClaimedModal).to.equal(true);
    })

    it('should show estimates button', function() {
      scope.$emit('projectClaimed')
      expect(controller.showEstimatesButton).to.equal(true)
    })
  })

  context('when project is not claimed', function() {
      it ('should not show claimed modal', function() {
        expect(controller.showClaimedModal).to.equal(false);
      })

      it ('should not show estimates button', function() {
        expect(controller.showEstimatesButton).to.equal(false)
      })
    })
  });
});
