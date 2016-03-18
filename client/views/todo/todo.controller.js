'use strict';

angular.module('dockit')
  .controller('TodoCtrl', ['$location', '$log', '$routeParams', 'TodoService', function ($location, $log, $routeParams, TodoService) {

    var vm = this;
    vm.formData = {};
    vm.lists = [];
    vm.todos = [];
    var boardId = $routeParams.boardId;

    angular.extend(vm, {

      name: 'TodoCtrl',

    });

      vm.showTodos = function () {
        TodoService.showTodos(listId)
        .then(function (foundLists) {
          vm.lists = foundLists;
        });
      }

      vm.create = function (id) {
        vm.formData.listId = id;
        console.log(formData);
        TodoService.createTodo(vm.formData)
        .then(function (foundTodos) {
          vm.todos = foundTodos;
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