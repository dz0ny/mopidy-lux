'use strict';

angular.module('mopidyWeb2App', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'PlayerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
