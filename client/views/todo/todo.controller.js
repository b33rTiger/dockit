'use strict';

angular.module('dockit')
  .controller('TodoCtrl', ['$location', '$log', '$routeParams', 'TodoService', 'ListService', function ($location, $log, $routeParams, TodoService, ListService) {

    var vm = this;
    vm.formData = {};
    vm.lists = [];
    vm.todos = [];

    angular.extend(vm, {

      name: 'TodoCtrl',

    });

      vm.showTodos = function (listId) {
        TodoService.showTodos(listId)
        .then(function (foundTodos) {
          vm.todos = foundTodos;
        });
      }

      vm.create = function (listId) {
        vm.formData.listId = listId;
        TodoService.createTodo(vm.formData)
        .then(function (foundTodos) {
          vm.todos = foundTodos;
          vm.formData = {};
        });
      }

      vm.delete = function (data) {
        TodoService.deleteTodo(data)
        .then(function (data) {
          vm.todos = data;
          // for (var i = 0; i < vm.lists.length; i++) {
          //   if (vm.lists[i]._id == data._id) {
          //     vm.lists.splice(i, 1);
          //     break;
            // }
          // }
        })
      }

  }]);