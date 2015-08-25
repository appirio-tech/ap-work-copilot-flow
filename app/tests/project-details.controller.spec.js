'use strict';

describe ('ProjectDetailsController', function () {
  var controller, flush, scope

  beforeEach(function () {
    bard.inject(this, '$q', '$controller', '$rootScope', '$state', 'CopilotProjectDetailsAPIService', 'CopilotProjectsAPIService', 'UserV3Service');
    flush = function() {$rootScope.$apply()}
    scope = $rootScope.$new();

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

    bard.mockService(UserV3Service, {
      getCurrentUser: $q.when({id: '123'})
    })


    bard.mockService($state, {
      go: $q.when({}),
      params: {id: '123'}
    })

    controller = $controller('ProjectDetailsController', {$scope: scope});
    scope.vm = controller;
    flush();

  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Project Details Controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    it ('should submit a claim', function() {
      controller.userId = '123';
      controller.submitClaim();
      expect(CopilotProjectDetailsAPIService.post.called).to.be.ok;
    })

    it ('should check if a project is available', function() {
      controller.work = {status: 'Submitted'}
      var result = controller.projectAvailable()
      expect(result).to.equal(true)
    })

    it ('should show launch project after creating challenges', function() {
      controller.openCreateChallenges();
      expect(controller.showLaunchButton).to.equal(true);
    })

    it ('should launch a project', function() {
      controller.userId = '123';
      controller.launchProject();
      expect(CopilotProjectDetailsAPIService.put).to.have.been.called;
    })

    it ('should navigate to the messaging page', function() {
      controller.navigateMessaging();
      $state.params = {'id': '124'}
      expect($state.go.called).to.be.ok;
    })

    it ('should fetch work data on activate', function() {
      expect(CopilotProjectsAPIService.get.called).to.be.ok;
    })

  });
});
