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
      $http.post('/api/lists/create/', formData)
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
      $http.post('/api/lists/update/' + id, formData)
        .sucess(function (updatedBoard) {
          deferred.resolve(updatedBoard);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        })
      return deferred.promise;
    }

    service.deleteList = function (data) {
      var deferred = $q.defer();
      $http.post('/api/lists/delete/', data)
        .success(function (deletedList) {
          deferred.resolve(deletedList);
        })
        .error(function (error) {
          deferred.reject('Error: ', error);
        });
      return deferred.promise;
    }

    return service;
  })