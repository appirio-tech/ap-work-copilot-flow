// (function () {
//   'use strict';

//   angular
//     .module('ap-copilot-flow.project-details')
//     .factory('ProjectDetailsService', ProjectDetailsService);

//   ProjectDetailsService.$inject = ['$resource', 'API_URL', 'UserV3Service'];

//   function ProjectDetailsService($resource, API_URL, UserV3Service) {

//     var url = API_URL + '/v3/copilots/:userId/projects/:projectId'

//      function transformResponse (response) {
//       var parsed = JSON.parse(response)
//       return parsed.result.content ? parsed.result.content : {}
//     }

//     var params  = {
//       userId      : '@userId',
//       projectId  : '@projectId'
//     }

//     var actions = {
//       query: {
//         method           : 'GET',
//         isArray          : true,
//         transformResponse: transformResponse
//       },
//       post: {
//         method           : 'POST',
//         isArray          : false,
//         transformResponse: transformResponse
//       },
//       put: {
//         method           : 'PUT',
//         isArray          : false,
//         transformResponse: transformResponse
//       }
//     }

//     return $resource(url, params, actions);

//   }
// })();
