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

    // describe('initializeCopilotWork method', function() {
    //   it ('should initialize the work', function() {
    //     service.initializeCopilotWork('123');
    //     expect(service.workDetails['123']).to.be.ok
    // })
    // })
  });
});

