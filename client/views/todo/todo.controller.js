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

      vm.showTodos = function (listId) {
        TodoService.showTodos(listId)
        .then(function (foundTodos) {
          vm.todos = foundTodos;
        });
      }

      vm.create = function (id) {
        vm.formData.listId = id;
        TodoService.createTodo(vm.formData)
        .then(function (foundTodos) {
          console.log('client side found todos after adding: ', foundTodos);
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