'use strict'

angular.module('newSrcApp')
  .controller 'PlaylistCtrl', ($scope, Mopidy, $rootScope, $timeout) ->

    $rootScope.title = "Playlist"
    debouce = false
    scrollTo = (index)->
      $timeout(->
        $('table tbody tr').removeClass('active')
        tr = $("table tbody tr:eq(#{index})").addClass('active')
        if tr.length
          $("body").animate
            scrollTop: tr.offset().top-100
          , 800
      , 100)


    $rootScope.$watch "indexNow", (new_value, old_value)->
      if new_value >= 0
        scrollTo(new_value)

    tracklistChanged = ->
      $timeout.cancel debouce
      debouce = $timeout(->
          Mopidy.getTracklist (data) ->
            $scope.tracks = data
            scrollTo($rootScope.indexNow)
      , 100)

    $scope.pause = (track) ->
      Mopidy.native.playback.pause()

    $scope.toggleMenu = ->
      $("#wrapper").toggleClass("active")

    $scope.play = (track) ->
      Mopidy.changeTrack track
      Mopidy.native.playback.play()

    $scope.clear = () ->
      Mopidy.native.tracklist.clear()

    #handle events
    $scope.$on "mopidy:tracklist_changed", tracklistChanged
    $scope.$on "mopidy:online", tracklistChanged
    if $rootScope.isConnected
      tracklistChanged()

