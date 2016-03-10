'use strict';

angular.module('dockit')
  .service('ListService', function ($rootScope, $q, $http) {
    var service = {};

    service.showLists = function (id) {
      var deferred = $q.defer();
      $http.get('/api/lists/' + id)
        .success(function (returnedLists) {
          deferred.resolve(returnedLists);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
      return deferred.promise;
    }

    service.createList = function (formData) {
      var deferred = $q.defer();
      $http.post('/api/boards/create', formData)
        .success(function (data) {
          formData = {};
          deferred.resolve(data);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
      return deferred.promise;
    }

    service.updateList = function (id, formData) {
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

    service.deleteList = function (id) {
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

    return service;
  })