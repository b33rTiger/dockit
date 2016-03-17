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

      vm.delete = function (data) {
        ListService.deleteList(data)
        .then(function (data) {
          vm.lists = data;
          // for (var i = 0; i < vm.lists.length; i++) {
          //   if (vm.lists[i]._id == data._id) {
          //     vm.lists.splice(i, 1);
          //     break;
            // }
          // }
        })
      }

  }]);