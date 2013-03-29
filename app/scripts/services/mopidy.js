'use strict';

angular.module('mopidyWeb2App')
  .factory('mopidy', function ($rootScope) {
  var mopidy = new Mopidy();
  //Override mopidy.on to $apply the changes to angular
  //mopidy.on(console.log.bind(console));
  window.m = mopidy;

  // Optimized binding results in 6x performance increase
  function internalOn(eventName, fn) {
      mopidy.on(eventName, function(data) {
          $rootScope.$apply(function() {
              fn(data);
          });
      });
  }

  internalOn("state:online", function () {
      $rootScope.isConnected = true;
  });

  internalOn("state:offline", function () {
      $rootScope.isConnected = false;
  });

  return {
      on: internalOn,
      emit: mopidy.emit,
      native: mopidy,
      getCurrentTrack: function (fn) {
        mopidy.playback.getCurrentTrack().then(function(data) {
            $rootScope.$apply(function() {
                fn(data);
            });
        });
      },
      changeTrack: function (track) {
        mopidy.playback.changeTrack(track).then(function(data) {
            $rootScope.$apply(function() {
                console.log(data);
            });
        });
      },
      getTracklistPosition: function (fn) {
        mopidy.playback.getTracklistPosition().then(function(data) {
            $rootScope.$apply(function() {
                fn(data);
            });
        });
      },
      getTracklist: function (fn) {
        mopidy.tracklist.getTlTracks().then(function(data) {
            $rootScope.$apply(function() {
                fn(data);
            });
        });
      },
      getState: function (fn) {
        mopidy.playback.getState().then(function(data) {
            $rootScope.$apply(function() {
                fn(data);
            });
        });
      },
      getTimePosition: function (fn) {
        mopidy.playback.getTimePosition().then(function(data) {
            $rootScope.$apply(function() {
                fn(data);
            });
        });
      }
  };
});