'use strict';

angular.module('mopidyWeb2App')
  .controller('TracklistCtrl', function ($scope, mopidy) {
    $scope.tracks = [];

    $scope.play = function (track) {
        mopidy.changeTrack(track);
    }

    function update_tracklist () {
        mopidy.getTracklistPosition(function (ctrack) {
             mopidy.getTracklist(function (data) {
                var tracks = [];
                for (var i = 0; i < data.length; i++) {

                    var t = data[i].track;

                    var artist = "";
                    if (t.artists) {
                        artist = t.artists[0].name;
                    }

                    var album = false;
                    if (t.album) {
                      album = t.album.name;
                    }

                    var cover = false;
                    if (t.album.images) {
                        cover = t.album.images[0];

                        //SoundCloud
                        if (/sndcdn/.test(cover)) {
                            cover = cover.replace("-large.jp","-t200x200.jp");
                        };
                    }

                    tracks.push({
                        tl_track: data[i],
                        track: t.name,
                        artist: artist,
                        album: album,
                        cover: cover,
                        uri: t.uri,
                        active: i == ctrack
                    });
                };
                $scope.tracks = tracks;
            });
        });


    }


    mopidy.on("event:tracklistChanged", update_tracklist)
    mopidy.on("event:playbackStateChanged", update_tracklist)

    mopidy.on("state:online", function () {
        update_tracklist();
    });
});
