'use strict';

describe ('ChallengesController', function () {
  var controller, flush, scope

  beforeEach(function () {
    bard.inject(this, '$q', '$controller', '$rootScope', 'CopilotProjectDetailsAPIService', 'CopilotProjectsAPIService');
    flush = function() {$rootScope.$apply()}

    bard.mockService(CopilotProjectDetailsAPIService, {
      _default: {
        $promise:
          $q.when({})
        },
        post: {
          $promise:
          $q.when({})
        }
    });

    bard.mockService(CopilotProjectsAPIService, {
      _default: {
        $promise:
          $q.when({})
        }
    });

    scope =  $rootScope.$new()
    controller = $controller('ChallengesController', {$scope: scope});
    scope.vm   = controller

  });

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

    it ('should be able to submit challenges', function() {
      controller.userId = '123';
      controller.work = {id: '123'}
      controller.submit();
      expect(CopilotProjectDetailsAPIService.put.called).to.be.ok;
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
