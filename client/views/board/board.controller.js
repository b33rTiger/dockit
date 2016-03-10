'use strict';

angular.module('dockit')
  .controller('BoardCtrl', ['$location', '$log', '$routeParams', 'BoardService', function ($location, $log, $routeParams, BoardService) {

    var vm = this;
    vm.formData = {};
    vm.boards = [];

    angular.extend(vm, {

      name: 'BoardCtrl',

    });

      vm.showBoards = function () {
        BoardService.showBoards()
        .then(function (foundBoards) {
          vm.boards = foundBoards;
        });
      }

      vm.create = function () {
        BoardService.createBoard(vm.formData)
        .then(function (foundBoards) {
          vm.boards.push(foundBoards);
          vm.formData = {};
          $location.path('/board');
        });
      }

  }]);