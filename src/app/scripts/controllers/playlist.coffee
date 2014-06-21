'use strict'

angular.module('newSrcApp')
  .controller 'PlaylistCtrl', ($scope, Mopidy, $rootScope, $log) ->

    $rootScope.title = "Playlist"

    scrollTo = (index)->
      $('table tbody tr').removeClass('active')
      tr = $("table tbody tr:eq(#{index})").addClass('active')
      console.log tr
      if tr
        $("body").animate
          scrollTop: tr.offset().top-100
        , 800

    $scope.$watch "indexNow", (new_value, old_value)->
      if new_value >= 0
        scrollTo(new_value)

    playbackStateChanged = (data)->
      if data.new_state is 'playing'
        Mopidy.getCurrentTlTrack (tl_track)->
          Mopidy.native.tracklist.index(tl_track).then (index) ->
            $scope.indexNow = index

    tracklistChanged = ->
      Mopidy.getTracklist (data) ->
        $scope.tracks = data

    $scope.pause = (track) ->
      Mopidy.native.playback.pause()

    $scope.toggleMenu = ->
      $("#wrapper").toggleClass("active")

    $scope.play = (track) ->
      Mopidy.changeTrack track
      Mopidy.native.playback.play()

    $scope.clear = () ->
      Mopidy.native.tracklist.clear()

    online = ->
      tracklistChanged()
      playbackStateChanged({new_state:'playing'})

    #handle events
    Mopidy.on "event:tracklistChanged", tracklistChanged
    Mopidy.on "event:playbackStateChanged", playbackStateChanged
    Mopidy.on "state:online", online
    if $rootScope.isConnected
      online()

    # deregister handlers
    $scope.$on '$destroy', ->
      Mopidy.off "event:tracklistChanged", tracklistChanged
      Mopidy.off "event:playbackStateChanged", playbackStateChanged
      Mopidy.off "state:online", online
