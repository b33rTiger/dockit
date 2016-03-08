'use strict';

angular.module('dockit')
  .service('BoardService', function ($rootScope, $q, $http) {
    var service = {};

    service.showBoards = function () {
      console.log('made it to showboards');
      var deferred = $q.defer();
      $http.get('/api/boards')
        .success(function (returnedBoards) {
          deferred.resolve(returnedBoards);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
      return deferred.promise;
    }

    service.createBoard = function (formData) {
      var deferred = $q.defer();
      $http.post('/api/board/create', formData)
        .success(function (data) {
          formData = {};
          deferred.resolve(data);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
      return deferred.promise;
    }

    service.updateBoard = function (id, formData) {
      var deferred = $q.defer();
      $http.post('/api/board/update/' + id, formData)
        .sucess(function (updatedBoard) {
          deferred.resolve(updatedBoard);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        })
      return deferred.promise;
    }

    service.deleteBoard = function (id) {
      var deferred = $q.defer();
      $http.post('/api/board/delete/' + id)
        .success(function (deletedBoard) {
          deferred.resolve(deletedBoard);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
      return deferred.promise;
    }

  })