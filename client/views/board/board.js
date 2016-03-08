'use strict';

angular.module('dockit')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/group', {
        templateUrl: 'views/board/board.html',
        controller: 'BoardCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
