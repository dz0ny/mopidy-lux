'use strict';

angular.module('mopidyWeb2App')
  .factory('mopidy', function ($rootScope) {
  var mopidy = new Mopidy();
  //Override mopidy.on to $apply the changes to angular
  mopidy.on(console.log.bind(console));
  return {
      on: function(eventName, fn) {
          mopidy.on(eventName, function(data) {
              $rootScope.$apply(function() {
                  fn(data);
              });
          });
      },
      emit: mopidy.emit,
      native: mopidy,
      getCurrentTrack: function (fn) {
        mopidy.playback.getCurrentTrack().then(function(data) {
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
      }
  };
});