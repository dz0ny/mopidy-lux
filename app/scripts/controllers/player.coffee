"use strict"
angular.module("mopidyLuxApp").controller "PlayerCtrl", ($scope, mopidy) ->
  
  # Scrub implementation
  timer = false
  updateScrubState = (pos) ->
    $scope.track_position_time = pos
    $scope.track_position = ($scope.track_position_time / $scope.track_length) * 100
    updateScrubStateTimer()

  updateScrubStateTimer = ->
    if $scope.state is "playing"
      clearInterval timer
      timer = setTimeout(->
        $scope.$apply ->
          updateScrubState $scope.track_position_time + 1500

      , 1500)
    else
      clearInterval timer

  
  # Track tracking
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
      if data.album.images
        image = data.album.images[0]
        $scope.cover = image
      else
        $scope.cover = false
      if data.length
        $scope.track_length = data.length
        mopidy.getTimePosition updateScrubState
      else
        $scope.track_length = 0
        clearInterval timer
    else
      
      # New connection
      $scope.album = false
      $scope.artist = false
      $scope.cover = false
      $scope.track = false
      $scope.track_length = 0
      $scope.track_position = 0
      clearTimeout timer

  updateTrackInfo = (data) ->
    updateInfo data.tl_track.track
    updateScrubStateTimer()

  mopidy.on "event:trackPlaybackStarted", updateTrackInfo
  mopidy.on "event:trackPlaybackPaused", updateTrackInfo
  mopidy.on "event:trackPlaybackEnded", updateTrackInfo
  mopidy.on "event:seeked", updateScrubState
  mopidy.on "event:playbackStateChanged", (data) ->
    $scope.state = data.new_state
    mopidy.getTimePosition updateScrubState
    console.log "$scope.state", $scope.state

  mopidy.on "state:online", ->
    mopidy.getCurrentTrack updateInfo
    mopidy.getState (state) ->
      $scope.state = state
      mopidy.getTimePosition updateScrubState
  
  #Controls
  $scope.seek = (event) ->
    if event.button is 0
      newpos = (event.offsetX / event.currentTarget.clientWidth) * $scope.track_length
      mopidy.native.playback.seek newpos
      event.preventDefault()

  $scope.play = ->
    mopidy.native.playback.play()

  $scope.stop = ->
    mopidy.native.playback.stop()

  $scope.pause = ->
    mopidy.native.playback.pause()

  $scope.next = ->
    mopidy.native.playback.next()

  $scope.prev = ->
    mopidy.native.playback.previous()
