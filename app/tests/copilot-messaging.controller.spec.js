'use strict';

describe('CopilotMessagingController', function () {
  var controller, flush, scope

  beforeEach(function () {
    bard.inject(this, '$q', '$controller', '$rootScope', 'UserV3Service', '$state');
    flush = function() {$rootScope.$apply()}
    scope = $rootScope.$new();

    bard.mockService(UserV3Service, {
      _default: $q.when({id: '123'}),
      getCurrentUser: {id: '1234'}
    });
    bard.mockService($state, {
      params: {id: '123'},
      _default: $q.when({})
    });

    controller = $controller('CopilotMessagingController', {$scope: scope});
    flush();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Copilot Messaging Controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    it ('should navigate back to project details', function() {
      controller.back()
      expect($state.go.calledWith('project-details', {id: '123'})).to.be.ok
    })

    it('should initialize threadId via stateParams', function() {
      $state.params.id = '123';
      flush()
      expect(controller.threadId).to.equal('123')
    })

    it('should initialize subscriberId via UserV3Service', function() {
      UserV3Service.getCurrentUser()
      expect(controller.subscriberId).to.equal('1234')
    })

  });
});