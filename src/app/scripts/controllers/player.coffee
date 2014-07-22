'use strict'

angular.module('newSrcApp')
  .controller 'PlayerCtrl', ($scope, Mopidy, $timeout, $rootScope, $window, $log) ->
    # Track tracking
    timer = false
    $scope.loved = false
    $scope.volume_level = 0

    updateScrubState = (pos) ->
      $scope.track_position_time = pos
      $scope.track_position = ($scope.track_position_time / $scope.track_length) * 100
      updateScrubStateTimer()

    updateScrubStateTimer = ->
      if $scope.state is "playing"
        $timeout.cancel timer
        timer = $timeout(->
            updateScrubState $scope.track_position_time + 1000
        , 1000)
      else
        $timeout.cancel timer

    updateInfo = (data) ->

      if data.tlid?
        $rootScope.$broadcast "mopidy:track_index", data.tlid
      if data.track?
        data = data.track

      if data
        $scope.track = data.name
        if data.artists
          $scope.artist = data.artists[0].name
        else
          $scope.artist = false
        if data.album
          $scope.album = data.album.name
        else
          $scope.album = false
        if data.album.images?
          cover = data.album.images[0]
          cover = cover.replace("-large.jp", "-t500x500.jp")  if /sndcdn/.test(cover)
          $scope.cover= cover
        else
          if $scope.album and $scope.artist
            $scope.cover = "/lux/cover?album=#{$window.encodeURIComponent $scope.album}&artist=#{$window.encodeURIComponent $scope.artist}"
          else if $scope.artist
            $scope.cover = "/lux/cover?artist=#{$window.encodeURIComponent $scope.artist}&track=#{$window.encodeURIComponent $scope.track}"
          else
            $scope.cover = false
        if data.length
          $scope.track_length = data.length
        else
          $scope.track_length = 0
      else
        # New connection
        $scope.album = false
        $scope.artist = false
        $scope.cover = false
        $scope.track = false
        $scope.track_length = 0
        $scope.track_position = 0

    getButtonStates = ->
      Mopidy.getRandom (random)->
        $scope.random = random
      Mopidy.getRepeat (repeat)->
        $scope.repeat = repeat

    # Event handlers
    $scope.$on "mopidy:options_changed", getButtonStates
    $scope.$on "mopidy:seeked", (event, data)->
      $timeout.cancel timer
      updateScrubState data.time_position
    $scope.$on "mopidy:volume_changed", (event, data)->
      $scope.volume_level = data.volume
    $scope.$on "mopidy:playback_state_changed", (event, data) ->
      $timeout.cancel timer
      $scope.state = data.new_state
      Mopidy.getTimePosition updateScrubState
    $scope.$on "mopidy:track_playback_started", (event, data) ->
      updateInfo data.tl_track.track
    $scope.$on "mopidy:online", ->
      Mopidy.getState (state) ->
        $scope.state = state
        Mopidy.getCurrentTlTrack updateInfo
        Mopidy.getTimePosition updateScrubState
      getButtonStates()
    $scope.play = ->
      Mopidy.native.playback.play()

    $scope.stop = ->
      $timeout.cancel timer
      Mopidy.native.playback.stop()

    $scope.pause = ->
      $timeout.cancel timer
      Mopidy.native.playback.pause()

    $scope.next = ->
      $timeout.cancel timer
      Mopidy.native.playback.next()

    $scope.prev = ->
      $timeout.cancel timer
      Mopidy.native.playback.previous()

    $scope.toggle_volume = ->
      Mopidy.native.playback.getVolume().then (data)->
        $scope.$apply ->
          $log.info data
          $scope.volume_level = data
      $scope.volume = !$scope.volume

    $scope.toggle_random = ->
      Mopidy.native.tracklist.setRandom([!$scope.random])

    $scope.toggle_repeat = ->
      Mopidy.native.tracklist.setRepeat([!$scope.repeat])

    $scope.switchmode = ->
      $rootScope.ui_state = !$rootScope.ui_state

    $scope.toggle_love = ->
      $scope.loved = !$scope.loved

    $scope.seek = (event) ->
      width = event.currentTarget.clientWidth
      newpos = (event.offsetX / width) * $scope.track_length
      Mopidy.native.playback.seek [newpos]

    $scope.set_volume = (event) ->
      width = event.currentTarget.clientWidth
      newpos = (event.offsetX / width) * 100
      Mopidy.native.playback.setVolume [newpos]
