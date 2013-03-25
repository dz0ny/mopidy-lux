'use strict';

angular.module('mopidyWeb2App')
  .controller('PlayerCtrl', function ($scope, mopidy) {

    window.m = mopidy.native;

    var timer = false;

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
    
          if (data.album.images) {
              var image = data.album.images[0];
              $scope.cover = image;
          }else{
              $scope.cover = false;
          }

          if (data.length) {
              $scope.track_length = data.length;
              mopidy.getTimePosition(updateScrubState);
          }else{
            $scope.track_length = 0;
            clearInterval(timer);
          }

        }else{
          // New connection
          $scope.album = false;
          $scope.artist = false;
          $scope.cover = false;
          $scope.track = false;
          $scope.track_length = 0;
          $scope.track_position = 0;
          clearTimeout(timer);
        }
    }

    var updateState = function(state){
        $scope.state = state;
    }

    var updateScrubState = function(pos){
        
        $scope.track_position_time = pos;
        $scope.track_position = ($scope.track_position_time / $scope.track_length) *100;
        updateScrubStateTimer();  
    }
    var updateScrubStateTimer = function(){
        if ($scope.state == "playing") {
          clearInterval(timer);
          timer = setTimeout(function () {
            $scope.$apply(function(){
              updateScrubState($scope.track_position_time + 1000);
            });
          },1000);
        }else{
          clearInterval(timer);
        }
    }

    mopidy.on("event:trackPlaybackStarted", function (data) {
        updateInfo(data.tl_track.track);
        mopidy.getCurrentTrack(updateInfo);
    });
    mopidy.on("event:trackPlaybackEnded", function (data) {
        updateInfo(data.tl_track.track);
        mopidy.getCurrentTrack(updateInfo);
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

    mopidy.on("state:offline", function () {
        $scope.isConnected = false;
    });

    $scope.seek = function (event) {
        if (event.button == 0) {
            var newpos = (event.offsetX / event.currentTarget.clientWidth) * $scope.track_length;
            updateScrubState(newpos);
            mopidy.native.playback.seek(newpos);
            event.preventDefault();
        };
    }
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