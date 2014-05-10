'use strict'

angular.module('newSrcApp')
  .controller 'PlaylistCtrl', ($scope, Mopidy) ->
    get_current_track = (data)->
      Mopidy.getState (state) ->
        $scope.state = state
      Mopidy.getTracklistPosition (ctrack) ->
        $scope.current_track = ctrack

    update_tracklist = ->
      Mopidy.getTracklist (data) ->
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
      Mopidy.changeTrack track
      if $scope.state isnt "playing"
        Mopidy.native.playback.play()
      

    Mopidy.on "event:tracklistChanged", update_tracklist
    Mopidy.on "event:playbackStateChanged", get_current_track
    Mopidy.on "state:online", ->
      update_tracklist()
      get_current_track()