'use strict';

angular.module('mopidyWeb2App')
  .controller('PlayerCtrl', function ($scope, mopidy) {

    window.m = mopidy.native;

    var updateInfo = function(data){

        if (data) {

          $scope.track = data.name;

          if (data.artists) {
              $scope.artist = data.artists[0].name;
          }else{
              $scope.artist = false;
          }

          if (data.album) {
            $scope.album = data.album.name;
          }else{
            $scope.album = false;
          }
    
          if (data.album.images.length) {
              var image = data.album.images[0];
              $scope.cover = image;
          }else{
              $scope.cover = false;
          }
        }
    }

    var updateState = function(state){
        $scope.state = state;
    }
    mopidy.on("event:trackPlaybackStarted", function (data) {
        updateInfo(data.tl_track.track);
    });
    mopidy.on("event:trackPlaybackEnded", function (data) {
        updateInfo(data.tl_track.track);
    });
    
    mopidy.on("event:playbackStateChanged", function (data) {
        $scope.state = data.new_state;
        mopidy.getCurrentTrack(updateInfo);
    });

    mopidy.on("state:online", function () {
        mopidy.getCurrentTrack(updateInfo);
        mopidy.getState(updateState);
        $scope.isConnected = true;
    });

    $scope.play = function () {
        mopidy.native.playback.play();
    }
    $scope.stop = function () {
        mopidy.native.playback.stop();
    }
    $scope.pause = function () {
        mopidy.native.playback.pause();
    }
    $scope.next = function () {
        mopidy.native.playback.next();
    }
    $scope.prev = function () {
        mopidy.native.playback.previous();
    }

});