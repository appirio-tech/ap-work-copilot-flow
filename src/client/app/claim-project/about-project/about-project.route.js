// (function () {
//   'use strict';

//   angular
//     .module('app.claim-project')
//     .run(appRun);

//   appRun.$inject = ['routerHelper'];
//   /* @ngInject */
//   function appRun(routerHelper, dataProvider) {
//     routerHelper.configureStates(getStates());
//   }

//   function getStates() {
//     return [
//       {
//         state: 'about-name',
//         config: {
//           url: '/claim-project/about/name',
//           templateUrl: 'claim-project/about-project/views/name.html',
//           controller: 'SubmitNameController',
//           controllerAs: 'vm',
//           title: 'Name',
//           settings: {}
//         }
//       },
//       {
//         state: 'about-type',
//         config: {
//           url: '/claim-project/about/type',
//           templateUrl: 'claim-project/about-project/views/type.html',
//           controller: 'SubmitTypeController',
//           controllerAs: 'vm',
//           title: 'Type',
//           settings: {}
//         }
//       },
//       {
//         state: 'about-brief',
//         config: {
//           url: '/claim-project/about/brief',
//           templateUrl: 'claim-project/about-project/views/brief.html',
//           controller: 'SubmitBriefController',
//           controllerAs: 'vm',
//           title: 'Brief',
//           settings: {}
//         }
//       },
//       {
//         state: 'about-competitors',
//         config: {
//           url: '/claim-project/about/competitors',
//           templateUrl: 'claim-project/about-project/views/competitors.html',
//           controller: 'SubmitCompetitorsController',
//           controllerAs: 'vm',
//           title: 'Competitors',
//           settings: {}
//         }
//       }
//     ];
//   }
// })();
