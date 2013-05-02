'use strict'

angular.module('mopidyLuxApp')
  .controller 'LibrarySectionCtrl', ($scope, mopidy, $routeParams) ->
    $scope.section = $routeParams.section

    render = ()->
      if $scope.section is "albums"
          mopidy.getAlbums (albums)->
            $scope.results = albums
      if $scope.section is "artists"
          mopidy.getArtists (artists)->
            $scope.results = artists

    if mopidy.isConnected()
      render()

    mopidy.on "state:online", ->
      render()