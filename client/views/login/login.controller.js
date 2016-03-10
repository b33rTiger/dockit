'use strict';

angular.module('dockit')
  .controller('LoginCtrl', ['$scope', '$location', 'Auth', function ($scope, $location, Auth) {

    var vm = this;

    angular.extend(vm, {

      name: 'LoginCtrl',

      login: function () {
        Auth.login(vm.user)
          .then(function () {
            $location.path('/board');
          })
          .catch(function (err) {
            $location.path('/');
            ErrorService.errorToasty(err);
          });
      }

    });

  }]);