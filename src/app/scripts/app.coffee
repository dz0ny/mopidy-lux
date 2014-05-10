'use strict'

angular
  .module('newSrcApp', [
    'ngSanitize',
    'ngRoute',
    'mgcrea.ngStrap',
  ])
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/playlist.html'
        controller: 'PlaylistCtrl'
      .otherwise
        redirectTo: '/'

  .run ($rootScope)->
    $rootScope.$watch 'description', () ->
      angular.element("head meta[name=description]").attr("content", $rootScope.description)
    $rootScope.$watch 'title', () ->
      angular.element("head title").text("Lux - #{$rootScope.title}")
