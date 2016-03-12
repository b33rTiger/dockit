'use strict';

angular.module('dockit')
  .controller('ListCtrl', ['$location', '$log', '$routeParams', 'ListService', function ($location, $log, $routeParams, ListService) {

    var vm = this;
    vm.formData = {};
    vm.lists = [];
    var boardId = $routeParams.boardId;

    angular.extend(vm, {

      name: 'ListCtrl',

    });

      vm.showLists = function () {
        ListService.showLists(boardId)
        .then(function (foundLists) {
          vm.lists = foundLists;
        });
      }

      vm.create = function (id) {
        vm.formData.boardId = id;
        ListService.createList(vm.formData)
        .then(function (foundLists) {
          vm.lists = foundLists;
          vm.formData = {};
        });
      }

  }]);