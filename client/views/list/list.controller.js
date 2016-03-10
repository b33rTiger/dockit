'use strict';

angular.module('dockit')
  .controller('ListCtrl', ['$location', '$log', '$routeParams', 'ListService', function ($location, $log, $routeParams, ListService) {

    var vm = this;
    vm.formData = {};
    vm.lists = [];

    angular.extend(vm, {

      name: 'ListCtrl',

    });

      vm.showLists = function (id) {
        console.log('made it to list controller client');
        console.log(id);
        ListService.showLists(id)
        .then(function (foundLists) {
          vm.lists = foundLists;
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