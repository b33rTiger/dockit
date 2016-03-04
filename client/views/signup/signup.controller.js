'use strict';

angular.module('dockit')
  .controller('SignupCtrl', ['$location', 'Auth', function ($location, Auth) {

    var vm = this;

    angular.extend(vm, {

      name: 'SignupCtrl',

      signup: function () {
        console.log('made it to signup');
        Auth.signup(vm.user)
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
