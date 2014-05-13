'use strict'

angular
  .module('newSrcApp', [
    'ngSanitize',
    'ngRoute',
    'mgcrea.ngStrap',
    'config',
    'pasvaz.bindonce'
  ])
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/playlist.html'
        controller: 'PlaylistCtrl'
      .otherwise
        redirectTo: '/'

  .run ($rootScope, ENV)->
    $rootScope.toplayer = ->
      $("#wrapper").toggleClass("active")
      $rootScope.ui_state = !$rootScope.ui_state
    $rootScope.$watch 'title', () ->
      if ENV.name is 'development'
        angular.element("head title").text("Lux(#{ENV.build}) - #{$rootScope.title}")
      else
        angular.element("head title").text("Lux - #{$rootScope.title}")
