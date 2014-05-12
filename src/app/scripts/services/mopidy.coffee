'use strict'

angular.module('newSrcApp')
  .factory 'Mopidy', ($rootScope, ENV)->
  	cached = {
  	  albums: false
  	  artists: false
  	}
  	# Optimized binding results in 6x performance increase
  	internalOn = (eventName, fn) ->
  	  mopidy.on eventName, (data) ->
  	    $rootScope.$apply ->
  	      fn data
  	_buildLibrary = (fn)->
  	  unless cached.artists and cached.albums

  	    mopidy.library.search().then (results) ->
  	      albums =  []
  	      artists =  []
  	      for backend in results
  	        t_albums = []
  	        t_artists = []
  	        if backend.tracks
  	          for track in backend.tracks
  	            unless _.contains t_albums, track.album.name
  	              t_albums.push track.album.name
  	              albums.push {
  	                name: track.album.name
  	                art: _.first(track.album.images)
  	                backend: backend.uri
  	                model: "album"
  	              }
  	            unless _.contains t_artists, _.first(track.artists).name
  	              t_artists.push _.first(track.artists).name
  	              artists.push {
  	                name: _.first(track.artists).name
  	                art: _.first(track.album.images)
  	                backend: backend.uri
  	                model: "artist"
  	              }
  	      cached.artists = artists
  	      cached.albums = albums
  	      $rootScope.$apply ->
  	        fn albums, artists
  	  else
  	    fn cached.albums, cached.artists

  	window.mopidy = mopidy = new Mopidy({webSocketUrl:if ENV.name is 'development' then "ws://#{location.hostname}:6680/mopidy/ws" else false})

  	internalOn "state:online", ->
  	  $rootScope.isConnected = true

  	internalOn "state:offline", ->
  	  $rootScope.isConnected = false

  	isConnected: ->
  	  return $rootScope.isConnected
  	on: internalOn
  	off: mopidy.off
  	emit: mopidy.emit
  	native: mopidy

  	getCurrentTrack: (callback) ->
  	  mopidy.playback.getCurrentTrack().then (data) ->
  	    $rootScope.$apply ->
  	      callback data

  	getCurrentTlTrack: (callback) ->
  	  mopidy.playback.getCurrentTlTrack().then (data) ->
  	    $rootScope.$apply ->
  	      callback data

  	changeTrack: (track) ->
  	  mopidy.playback.changeTrack track

  	getTracklistPosition: (tl_track, callback) ->
  	  mopidy.tracklist.index(tl_track).then (data) ->
  	    $rootScope.$apply ->
  	      callback data

  	getTracklist: (callback) ->
  	  mopidy.tracklist.getTlTracks().then (data) ->
  	    $rootScope.$apply ->
  	      callback data

  	getState: (callback) ->
  	  mopidy.playback.getState().then (data) ->
  	    $rootScope.$apply ->
  	      callback data

  	getVolume: (callback) ->
  	  mopidy.playback.getVolume().then (data) ->
  	    $rootScope.$apply ->
  	      callback data

  	getRandom: (callback) ->
  	  mopidy.tracklist.getRandom().then (data) ->
  	    $rootScope.$apply ->
  	      callback data

  	getRepeat: (callback) ->
  	  mopidy.tracklist.getRepeat().then (data) ->
  	    $rootScope.$apply ->
  	      callback data

  	getTimePosition: (callback) ->
  	  mopidy.playback.getTimePosition().then (data) ->
  	    $rootScope.$apply ->
  	      callback data

  	getAlbums: (callback)->
  	  _buildLibrary (albums, artists)->
  	    callback albums

  	getArtists: (callback)->
  	  _buildLibrary (albums, artists)->
  	    callback artists
