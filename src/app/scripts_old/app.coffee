'use strict'

angular.module('mopidyLuxApp', [])
  .config ($routeProvider) ->
    $routeProvider
      .when '/library/:section',
        templateUrl: 'views/LibrarySection.html',
        controller: 'LibrarySectionCtrl'
      .when '/',
        templateUrl: 'views/LibrarySearch.html',
        controller: 'LibrarySearchCtrl'
      .otherwise
        redirectTo: '/'
