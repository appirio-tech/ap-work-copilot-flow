/* jshint -W117, -W030 */
 describe('ProjectsService', function () {
   var service, requests;

   beforeEach(function () {
     bard.inject(this, 'ProjectsService');
   });

   beforeEach(function () {
     service = ProjectsService;
   });

   bard.verifyNoOutstandingHttpRequests();

   describe('Projects Service', function () {
     it('should be created successfully', function () {
       expect(service).to.be.defined;
     });

   });
 });
