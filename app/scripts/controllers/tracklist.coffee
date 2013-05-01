"use strict"
angular.module("mopidyWeb2App").controller "TracklistCtrl", ($scope, mopidy) ->

  get_current_track = (data)->
    mopidy.getState (state) ->
      $scope.state = state
    mopidy.getTracklistPosition (ctrack) ->
      $scope.current_track = ctrack

  update_tracklist = ->
    mopidy.getTracklist (data) ->
      tracks = []
      i = 0

      while i < data.length
        t = data[i].track
        artist = ""
        artist = t.artists[0].name  if t.artists
        album = false
        album = t.album.name  if t.album
        cover = false
        if t.album.images
          cover = t.album.images[0]
          
          #SoundCloud
          cover = cover.replace("-large.jp", "-t200x200.jp")  if /sndcdn/.test(cover)
        tracks.push
          tl_track: data[i]
          track: t.name
          artist: artist
          album: album
          cover: cover
          uri: t.uri
          id: i

        i++
      $scope.tracks = tracks
      get_current_track()

  $scope.tracks = []
  $scope.play = (track) ->
    mopidy.changeTrack track
    if $scope.state isnt "playing"
      mopidy.native.playback.play()
    

  mopidy.on "event:tracklistChanged", update_tracklist
  mopidy.on "event:playbackStateChanged", get_current_track
  mopidy.on "state:online", ->
    update_tracklist()
    get_current_track()

