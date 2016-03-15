'use strict';

angular.module('dockit')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/list/:boardId', {
        templateUrl: 'views/list/list.html',
        controller: 'ListCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });