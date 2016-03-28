'use strict';

angular.module('dockit')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/list/:boardId', {
        templateUrl: 'views/list/list.html',
        controller: 'TodoCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });