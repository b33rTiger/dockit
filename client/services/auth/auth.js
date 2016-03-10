'use strict';

angular.module('dockit')
  .service('Auth', function ($rootScope, $cookieStore, $q, $http, $location) {

    var _user = {};
    var _ready = $q.defer();

    if ($cookieStore.get('token')) {
      $http.get('/api/users/me')
        .then(function (res) {
          _user = res.data;
        })
        .finally(function () {
          _ready.resolve();
        });
    } else {
      _ready.resolve();
    }

    this.signup = function (user) {
      var deferred = $q.defer();
      $http.post('/api/users', user)
        .then(function (res) {
          _user = res.data.user;
          $cookieStore.put('token', res.data.token);
          deferred.resolve();
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    this.login = function (user) {
      var deferred = $q.defer();
      $http.post('/auth/local', user)
        .then(function (res) {
          _user = res.data.user;
          $cookieStore.put('token', res.data.token);
          deferred.resolve();
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    };

    this.logout = function () {
      $cookieStore.remove('token');
      _user = {};
    };

    this.isLogged = function () {
      return _user.hasOwnProperty('_id');
    };

    this.isReadyLogged = function () {
      var def = $q.defer();
      _ready.promise.then(function () {
        if (_user.hasOwnProperty('_id')) {
          def.resolve();
        } else {
          def.reject();
        }
      });
      return def.promise;
    };

    this.getUser = function () {
      return _user;
    };

    this.getUserNow = function () {
      var deferred = $q.defer();

      if($cookieStore.get('token')) {
        $http.get('/api/users/me')
          .success(function (res) {
            deferred.resolve(res);
          })
          .error(function (error) {
            deferred.reject('Error: ', error);
          });
      }else{
        deferred.resolve(_user);
      }
      return deferred.promise;
    };

  });
