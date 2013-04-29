"use strict"
angular.module("mopidyWeb2App").factory "mopidy", ($rootScope) ->
  
  #Override mopidy.on to $apply the changes to angular
  
  # Optimized binding results in 6x performance increase
  internalOn = (eventName, fn) ->
    mopidy.on eventName, (data) ->
      $rootScope.$apply ->
        fn data


  mopidy = new Mopidy()
  window.mop = mopidy
  mopidy.on console.log.bind(console)
  window.m = mopidy
  internalOn "state:online", ->
    $rootScope.isConnected = true

  internalOn "state:offline", ->
    $rootScope.isConnected = false

  on: internalOn
  emit: mopidy.emit
  native: mopidy
  getCurrentTrack: (fn) ->
    mopidy.playback.getCurrentTrack().then (data) ->
      $rootScope.$apply ->
        fn data



  changeTrack: (track) ->
    mopidy.playback.changeTrack track

  getTracklistPosition: (fn) ->
    mopidy.playback.getTracklistPosition().then (data) ->
      $rootScope.$apply ->
        fn data



  getTracklist: (fn) ->
    mopidy.tracklist.getTlTracks().then (data) ->
      $rootScope.$apply ->
        fn data



  getState: (fn) ->
    mopidy.playback.getState().then (data) ->
      $rootScope.$apply ->
        fn data



  getTimePosition: (fn) ->
    mopidy.playback.getTimePosition().then (data) ->
      $rootScope.$apply ->
        fn data


