/* jshint -W117, -W030 */
// describe.only('ProjectDetailsService', function () {
//   var service

//   beforeEach(function () {
//     // bard.appModule('app.project-details')
//     bard.inject(this, '$q', 'ProjectDetailsService')
//     service = ProjectDetailsService;
//   });

//   bard.verifyNoOutstandingHttpRequests();

//   describe('Projects Details Service', function () {
//     it('should be created successfully', function () {
//       expect(service).to.be.defined;
//     });

//     describe('initializeCopilotWork method', function() {
//       it ('should update project status', function() {
//         service.initializeCopilotWork('123', 'claimed');
//         expect(service.workDetails['123']['status']).to.equal('claimed')
//     })
//     })
//   });
// });




// bard.mockService(ProjectDetailsService, {
//       initalizeCopilotWork: $q.when([{id: '123'}]),
//       work: {id: '123'},
//       _default: $q.when({})
//     });