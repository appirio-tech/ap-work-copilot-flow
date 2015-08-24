// (function () {
//   'use strict';

//   angular
//     .module('ap-copilot-flow.projects')
//     .factory('ProjectsService', ProjectsService);

//   ProjectsService.$inject = ['$resource', 'UserV3Service', 'API_URL'];

//   function ProjectsService($resource, UserV3Service, API_URL) {
//     var url = API_URL + '/v3/work/:workId'

//      function transformResponse (response) {
//       var parsed = JSON.parse(response)
//       return parsed.result.content? parsed.result.content : {}
//     }

//     var params  = {
//       workId      : '@workId'
//     }

//     var actions = {
//       query: {
//         method           : 'GET',
//         isArray          : true,
//         transformResponse: transformResponse
//       },
//       get: {
//         method           : 'GET',
//         isArray          : false,
//         transformResponse: transformResponse
//       }
//     }

//     return $resource(url, params, actions)

//   }
// })();
