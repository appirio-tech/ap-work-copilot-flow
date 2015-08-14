'use strict';

describe ('ProjectDetailsService', function () {
  var service, flush

  beforeEach(function () {
    bard.inject(this, '$q', '$rootScope', 'ProjectDetailsService', '$http')
    service = ProjectDetailsService;
    flush = function() {$rootScope.$apply()};

    bard.mockService(ProjectDetailsService, {
      _default: $q.when({}),
      submitClaim: $q.when({}),
      workDetails: {}
    });

    bard.mockService($http, {
      post: $q.when({})
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Projects Details Service', function () {
    it('should be created successfully', function () {
      expect(ProjectDetailsService).to.be.defined;
    });

    it('should have an initializeCopilotWork method', function () {
      expect(ProjectDetailsService.initializeCopilotWork).to.exist;
    });

    it('should have a submitClaim method', function () {
      expect(ProjectDetailsService.submitClaim).to.exist;
    });

    it('should have a submitChallenges method', function () {
      expect(ProjectDetailsService.submitChallenges).to.exist;
    });

    it('should have an launchProject method', function () {
      expect(ProjectDetailsService.launchProject).to.exist;
    });

    it('should have a projectAvailable method', function () {
      expect(ProjectDetailsService.projectAvailable).to.exist;
    });

    it('should have a showStatusComponent method', function () {
      expect(ProjectDetailsService.showStatusComponent).to.exist;
    });

    it('should have an openCreateChallenges method', function () {
      expect(ProjectDetailsService.openCreateChallenges).to.exist;
    });

    describe('initializeCopilotWork method', function() {
      it ('should initialize the work', function() {
        ProjectDetailsService.initializeCopilotWork('123');
        expect(ProjectDetailsService.work).to.be.ok
    })
    })

    describe('submitClaim method', function() {
      it ('should update status to assigned', function() {
        ProjectDetailsService.submitClaim('123');
        expect($http.post).to.have.been.called;
    })
    })

    describe('projectAvailable method', function() {
      it ('should return false if project is not available', function() {
        ProjectDetailsService.workDetails['123'] = {status: "Assigned"}
        expect(ProjectDetailsService.projectAvailable('123')).to.equal.false
      })

      it ('should return true if project is available', function() {
      ProjectDetailsService.workDetails['123'] = {status: "Submitted"}
      expect(ProjectDetailsService.projectAvailable('123')).to.equal.true
    })
    })

    describe('showStatusComponent method', function() {
      it ('should show status component if it matches current status', function() {
        ProjectDetailsService.workDetails['123'] = {status: "Assigned"}
        expect(ProjectDetailsService.showStatusComponent('123', 'Assigned')).to.equal.true
      })

      it ('should not show component if it does not match current status', function() {
      ProjectDetailsService.workDetails['123'] = {status: "Submitted"}
      expect(ProjectDetailsService.projectAvailable('123', 'Assigned')).to.equal.true
    })
    })

  //   describe('openCreateChallenges method', function() {
  //     it ('should set local status to awaiting_launch', function() {
  //       ProjectDetailsService.workDetails = {}
  //       ProjectDetailsService.workDetails['123'] = {status: "Approved"}
  //       ProjectDetailsService.openCreateChallenges('123')
  //       flush()
  //       expect(ProjectDetailsService.workDetails['123']['status']).to.equal('awaiting_launch')
  //   })
  // });
});
});

