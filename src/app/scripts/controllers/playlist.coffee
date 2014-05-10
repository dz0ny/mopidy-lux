'use strict'

angular.module('newSrcApp')
  .controller 'PlaylistCtrl', ($scope, Mopidy, $rootScope, $log) ->
    $rootScope.title = "Playlist"
    get_current_track = (data)->
      Mopidy.getCurrentTrack (data)->
        $scope.now_playing = data.uri
        $log.info data.uri
      Mopidy.getState (state) ->
        $scope.state = state
      Mopidy.getTracklistPosition (ctrack) ->
        console.log ctrack
        $scope.current_track = ctrack

    update_tracklist = ->
      Mopidy.getTracklist (data) ->
        $scope.tracks = data
        get_current_track()

    $scope.play = (track) ->
      Mopidy.changeTrack track
      if $scope.state isnt "playing"
        Mopidy.native.playback.play()

    online = ->
      update_tracklist()
      get_current_track()

    #handle events
    Mopidy.on "event:tracklistChanged", update_tracklist
    Mopidy.on "event:playbackStateChanged", get_current_track
    Mopidy.on "state:online", online
    if $rootScope.isConnected
      online()

    # deregister handlers
    $scope.$on '$destroy', ->
      Mopidy.off "event:tracklistChanged", update_tracklist
      Mopidy.off "event:playbackStateChanged", get_current_track
      Mopidy.off "state:online", online
