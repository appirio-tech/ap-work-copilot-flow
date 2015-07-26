// (function () {
//   'use strict';

//   angular
//     .module('example')
//     .controller('ExampleController', ExampleController);

//   ExampleController.$inject = ['$scope', 'AuthService'];

//   function ExampleController($scope, AuthService) {
//     var vm = this;

//     vm.authenticated = AuthService.isAuthenticated();
//     console.log('auth', vm.authenticated)
//     vm.login = function() {
//       console.log('effers', vm.username, vm.password)
//       AuthService.login({
//         username: vm.username,
//         password: vm.password,
//         success: function() {
//           vm.authenticated = AuthService.isAuthenticated();
//         },
//         error: function() {
//           console.log('ERROR')
//         }
//       });
//     };
// }
// })()