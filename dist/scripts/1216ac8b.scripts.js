"use strict";angular.module("mopidyWeb2App",[]).config(function(){}),angular.module("mopidyWeb2App").factory("mopidy",["$rootScope",function(t){function n(n,a){e.on(n,function(n){t.$apply(function(){a(n)})})}var e=new Mopidy;return e.on(console.log.bind(console)),window.m=e,n("state:online",function(){t.isConnected=!0}),n("state:offline",function(){t.isConnected=!1}),{on:n,emit:e.emit,"native":e,getCurrentTrack:function(n){e.playback.getCurrentTrack().then(function(e){t.$apply(function(){n(e)})})},changeTrack:function(t){e.playback.changeTrack(t)},getTracklistPosition:function(n){e.playback.getTracklistPosition().then(function(e){t.$apply(function(){n(e)})})},getTracklist:function(n){e.tracklist.getTlTracks().then(function(e){t.$apply(function(){n(e)})})},getState:function(n){e.playback.getState().then(function(e){t.$apply(function(){n(e)})})},getTimePosition:function(n){e.playback.getTimePosition().then(function(e){t.$apply(function(){n(e)})})}}}]),angular.module("mopidyWeb2App").controller("PlayerCtrl",["$scope","mopidy",function(t,n){var e=!1,a=function(n){t.track_position_time=n,t.track_position=100*(t.track_position_time/t.track_length),o()},o=function(){"playing"==t.state?(clearInterval(e),e=setTimeout(function(){t.$apply(function(){a(t.track_position_time+1500)})},1500)):clearInterval(e)},i=function(o){if(o){if(t.track=o.name,t.artist=o.artists?o.artists[0].name:!1,t.album=o.album?o.album.name:!1,o.album.images){var i=o.album.images[0];t.cover=i}else t.cover=!1;o.length?(t.track_length=o.length,n.getTimePosition(a)):(t.track_length=0,clearInterval(e))}else t.album=!1,t.artist=!1,t.cover=!1,t.track=!1,t.track_length=0,t.track_position=0,clearTimeout(e)},c=function(t){i(t.tl_track.track)};n.on("event:trackPlaybackStarted",c),n.on("event:trackPlaybackPaused",c),n.on("event:trackPlaybackEnded",c),n.on("event:seeked",a),n.on("event:playbackStateChanged",function(n){t.state=n.new_state,o(),console.log("$scope.state",t.state)}),n.on("state:online",function(){n.getCurrentTrack(i),n.getState(function(n){t.state=n,o()})}),t.seek=function(e){if(0==e.button){var a=e.offsetX/e.currentTarget.clientWidth*t.track_length;n.native.playback.seek(a),e.preventDefault()}},t.play=function(){n.native.playback.play()},t.stop=function(){n.native.playback.stop()},t.pause=function(){n.native.playback.pause()},t.next=function(){n.native.playback.next()},t.prev=function(){n.native.playback.previous()}}]),angular.module("mopidyWeb2App").controller("TracklistCtrl",["$scope","mopidy",function(t,n){function e(){n.getTracklistPosition(function(n){t.current_track=n})}function a(){n.getTracklist(function(n){for(var a=[],o=0;n.length>o;o++){var i=n[o].track,c="";i.artists&&(c=i.artists[0].name);var r=!1;i.album&&(r=i.album.name);var l=!1;i.album.images&&(l=i.album.images[0],/sndcdn/.test(l)&&(l=l.replace("-large.jp","-t200x200.jp"))),a.push({tl_track:n[o],track:i.name,artist:c,album:r,cover:l,uri:i.uri,id:o})}t.tracks=a,e()})}t.tracks=[],t.play=function(t){n.changeTrack(t)},n.on("event:tracklistChanged",a),n.on("event:playbackStateChanged",e),n.on("state:online",function(){a(),e()})}]),angular.module("mopidyWeb2App").controller("LibraryCtrl",["$scope",function(t){t.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("mopidyWeb2App").directive("scrollto",function(){return function(t,n,e){if(t.$eval(e.scrollto)){var a=$(window).scrollTop(),o=a+$(window).height(),i=$(n).offset().top,c=i+$(n).height();o>=c&&i>=a||$(n).parent().scrollTop($(n)[0].offsetTop-30)}}}),angular.module("mopidyWeb2App").directive("ngHover",function(){return{link:function(t,n,e){$(n).hover(function(){$(this).addClass(e.ngHover)},function(){$(this).removeClass(e.ngHover)})}}});