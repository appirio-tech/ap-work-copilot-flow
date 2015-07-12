/*global form:true, Auth0Lock:true */
(function () {
  'use strict';

  angular.module('app.auth')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$state', 'AuthService', 'UserV3Service', 'logger'];

  /* @ngInject */
  function RegisterController($state, AuthService, UserV3Service, logger) {
    var vm = this;
    vm.title = 'Register';
    vm.username  = '';
    vm.password = '';
    vm.error = false;
    vm.errorMessage = 'Error Creating User';

    vm.submit = null;

    activate();

    vm.submit = function() {
      vm.error = false;
      var registerOptions = {
        handle: vm.username,
        password: vm.password,
        email: vm.email
      };
      UserV3Service.createUser(registerOptions, registerSuccess, registerError);
    };

    function activate() {
      logger.log('Activated Registration View');
    }

    function registerError(error) {
      vm.error = true;
      vm.errorMessage = error;
    }

    function registerSuccess() {
      vm.error = false;

      var loginOptions = {
        username: vm.username,
        password: vm.password,
        success: success
      };

      AuthService.login(loginOptions);

      function success() {
        $state.go('view-projects.assigned');
      }
    }
  }
})();
