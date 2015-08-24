'use strict';

describe.only ('ChallengesController', function () {
  var controller, flush, scope

  beforeEach(function () {
    bard.inject(this, '$q', '$controller', '$rootScope', 'ProjectDetailsService');
    flush = function() {$rootScope.$apply()}
    bard.mockService(ProjectDetailsService, {
      _default: $q.when({})
    });

    scope =  $rootScope.$new()
    controller = $controller('ChallengesController', {$scope: scope});
    scope.vm   = controller
    flush();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Challenges Controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    it('should have a submit challenges function', function() {
      expect(controller.submit).to.be.a.function;
    });

    it ('should toggle dropdown menu', function() {
      controller.toggleMenu('showTypeMenu')
      expect(controller.showTypeMenu).to.be.ok
    })

    it ('should select individual challenge type', function() {
      controller.selectType('code');
      expect(controller.challenge.challengeType).to.equal('code')
    })

    it ('should select individual challenge count', function() {
      controller.selectCount(1);
      expect(controller.challenge.count).to.equal(1)
    })

    it ('should select overall challenge difficulty', function() {
      controller.selectDifficulty('low');
      expect(controller.overallDifficulty).to.equal('low')
    })

    it ('should show added challenges', function() {
      controller.showAddedChallenges();
      expect(ProjectDetailsService.showStatusComponent).to.have.been.called;
    })

    it ('should be able to submit challenges', function() {
      controller.submit();
      expect(ProjectDetailsService.submitChallenges).to.have.been.called;
    })
    it ('should initalize challenges', function() {
      expect(controller.challenges).to.eql([]);
    })

  context('when challenge type and count are not selected', function() {
    it ('should not add a challenge', function() {
      controller.addChallenge({id: 0, challengeType: null, count: null})
      expect(controller.challenges.length).to.equal(0)
    })
  })

  context('when challenge type and count are selected', function() {
      it ('should be able to add challenges', function() {
        controller.challenge.challengeType = 'code';
        controller.challenge.count = 1;
        controller.addChallenge({id: 0, challengeType: null, count: null})
        expect(controller.challenges).to.eql([{id: 0, challengeType: 'code', count: 1}])
      })
    })
  });
});
