'use strict';

angular.module('mopidyWeb2App')
  .controller('PlayerCtrl', function ($scope, mopidy) {

    // Scrub implementation
    var timer = false;
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
                updateScrubState($scope.track_position_time + 1500);
            });
          },1500);
        }else{
          clearInterval(timer);
        }
    }

    // Track tracking

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

    var updateTrackInfo =  function (data) {
        updateInfo(data.tl_track.track);
    };

    mopidy.on("event:trackPlaybackStarted", updateTrackInfo);
    mopidy.on("event:trackPlaybackPaused", updateTrackInfo);
    mopidy.on("event:trackPlaybackEnded", updateTrackInfo);
    mopidy.on("event:seeked", updateScrubState);

    mopidy.on("event:playbackStateChanged", function (data) {
      $scope.state = data.new_state;
      updateScrubStateTimer();
      console.log("$scope.state", $scope.state)
    });

    mopidy.on("state:online", function () {

        mopidy.getCurrentTrack(updateInfo);

        mopidy.getState(function (state) {
          $scope.state = state;
          updateScrubStateTimer();
        });
    });

    //Controls

    $scope.seek = function (event) {
        if (event.button == 0) {
            var newpos = (event.offsetX / event.currentTarget.clientWidth) * $scope.track_length;
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