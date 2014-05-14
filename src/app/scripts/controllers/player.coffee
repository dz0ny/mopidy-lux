'use strict'

angular.module('newSrcApp')
  .controller 'PlayerCtrl', ($scope, Mopidy, $timeout, $rootScope, $window) ->
    # Track tracking
    timer = false
    $scope.loved = false
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
    Mopidy.on "event:optionsChanged", getButtonStates
    Mopidy.on "event:seeked", (data)->
      $timeout.cancel timer
      updateScrubState data.time_position
    Mopidy.on "event:playbackStateChanged", (data) ->
      $timeout.cancel timer
      $scope.state = data.new_state
      Mopidy.getCurrentTrack updateInfo
      Mopidy.getTimePosition updateScrubState
    Mopidy.on "state:online", ->
      Mopidy.getState (state) ->
        $scope.state = state
        Mopidy.getCurrentTrack updateInfo
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

    $scope.toggle_random = ->
      Mopidy.native.tracklist.setRandom(!$scope.random)

    $scope.toggle_repeat = ->
      Mopidy.native.tracklist.setRepeat(!$scope.repeat)

    $scope.switchmode = ->
      $rootScope.ui_state = !$rootScope.ui_state

    $scope.toggle_love = ->
      $scope.loved = !$scope.loved

    $scope.seek = (event) ->
      newpos = (event.offsetX / event.currentTarget.clientWidth) * $scope.track_length
      Mopidy.native.playback.seek newpos
