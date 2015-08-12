/* jshint -W117, -W030 */
describe ('ProjectDetailsService', function () {
  var service

  beforeEach(function () {
    bard.inject(this, '$q', 'ProjectDetailsService')
    service = ProjectDetailsService;
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Projects Details Service', function () {
    it('should be created successfully', function () {
      expect(service).to.be.defined;
    });

    it('should have an initializeCopilotWork method', function () {
      expect(service.initializeCopilotWork).to.exist;
    });

    it('should have an submitClaim method', function () {
      expect(service.submitClaim).to.exist;
    });

    it('should have an submitChallenges method', function () {
      expect(service.submitChallenges).to.exist;
    });

    it('should have an launchProject method', function () {
      expect(service.launchProject).to.exist;
    });

    it('should have an projectAvailable method', function () {
      expect(service.projectAvailable).to.exist;
    });

    it('should have an showStatusComponent method', function () {
      expect(service.showStatusComponent).to.exist;
    });

    it('should have an openCreateChallenges method', function () {
      expect(service.openCreateChallenges).to.exist;
    });


    // describe('initializeCopilotWork method', function() {
    //   it ('should initialize the work', function() {
    //     service.initializeCopilotWork('123');
    //     expect(service.workDetails['123']).to.be.ok
    // })
    // })
  });
});

