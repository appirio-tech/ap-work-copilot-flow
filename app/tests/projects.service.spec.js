'use strict';

 describe('ProjectsService', function () {
   var service, requests;

   beforeEach(function () {
     bard.inject(this, 'ProjectsService', '$q', '$http');
   });

   beforeEach(function () {
     service = ProjectsService;

      bard.mockService($http, {
      _default: $q.when({})
    })
   });

   bard.verifyNoOutstandingHttpRequests();

   describe('Projects Service', function () {
     it('should be created successfully', function () {
       expect(service).to.be.defined;
     });

     it('should have a getWorkRequests method', function () {
       expect(service.getWorkRequests).to.exist;
     });

     // it('should make an http call for work requests', function() {
     //  service.getWorkRequests()
     //  expect($http.called).to.be.ok
     // })

    it('should have a getAssignedProjects method', function () {
      expect(service.getAssignedProjects).to.exist;
    });

   });
 });
