(function(){angular.module("mopidyWeb2App",[]).config(function(){})}).call(this),function(){"use strict";angular.module("mopidyWeb2App").factory("mopidy",["$rootScope",function(t){var n,e;return n=function(n,r){return e.on(n,function(n){return t.$apply(function(){return r(n)})})},e=new Mopidy,window.mop=e,e.on(console.log.bind(console)),window.m=e,n("state:online",function(){return t.isConnected=!0}),n("state:offline",function(){return t.isConnected=!1}),{on:n,emit:e.emit,"native":e,getCurrentTrack:function(n){return e.playback.getCurrentTrack().then(function(e){return t.$apply(function(){return n(e)})})},changeTrack:function(t){return e.playback.changeTrack(t)},getTracklistPosition:function(n){return e.playback.getTracklistPosition().then(function(e){return t.$apply(function(){return n(e)})})},getTracklist:function(n){return e.tracklist.getTlTracks().then(function(e){return t.$apply(function(){return n(e)})})},getState:function(n){return e.playback.getState().then(function(e){return t.$apply(function(){return n(e)})})},getTimePosition:function(n){return e.playback.getTimePosition().then(function(e){return t.$apply(function(){return n(e)})})}}}])}.call(this),function(){"use strict";angular.module("mopidyWeb2App").controller("PlayerCtrl",["$scope","mopidy",function(t,n){var e,r,a,o,i;return e=!1,a=function(n){return t.track_position_time=n,t.track_position=100*(t.track_position_time/t.track_length),o()},o=function(){return"playing"===t.state?(clearInterval(e),e=setTimeout(function(){return t.$apply(function(){return a(t.track_position_time+1500)})},1500)):clearInterval(e)},r=function(r){var o;return r?(t.track=r.name,t.artist=r.artists?r.artists[0].name:!1,t.album=r.album?r.album.name:!1,r.album.images?(o=r.album.images[0],t.cover=o):t.cover=!1,r.length?(t.track_length=r.length,n.getTimePosition(a)):(t.track_length=0,clearInterval(e))):(t.album=!1,t.artist=!1,t.cover=!1,t.track=!1,t.track_length=0,t.track_position=0,clearTimeout(e))},i=function(t){return r(t.tl_track.track),o()},n.on("event:trackPlaybackStarted",i),n.on("event:trackPlaybackPaused",i),n.on("event:trackPlaybackEnded",i),n.on("event:seeked",a),n.on("event:playbackStateChanged",function(e){return t.state=e.new_state,n.getTimePosition(a),console.log("$scope.state",t.state)}),n.on("state:online",function(){return n.getCurrentTrack(r),n.getState(function(e){return t.state=e,n.getTimePosition(a)})}),t.seek=function(e){var r;return 0===e.button?(r=e.offsetX/e.currentTarget.clientWidth*t.track_length,n["native"].playback.seek(r),e.preventDefault()):void 0},t.play=function(){return n["native"].playback.play()},t.stop=function(){return n["native"].playback.stop()},t.pause=function(){return n["native"].playback.pause()},t.next=function(){return n["native"].playback.next()},t.prev=function(){return n["native"].playback.previous()}}])}.call(this),function(){"use strict";angular.module("mopidyWeb2App").controller("TracklistCtrl",["$scope","mopidy",function(t,n){var e,r;return e=function(){return n.getState(function(n){return t.state=n}),n.getTracklistPosition(function(n){return t.current_track=n})},r=function(){return n.getTracklist(function(n){var r,a,o,i,c,u;for(u=[],i=0;n.length>i;)c=n[i].track,a="",c.artists&&(a=c.artists[0].name),r=!1,c.album&&(r=c.album.name),o=!1,c.album.images&&(o=c.album.images[0],/sndcdn/.test(o)&&(o=o.replace("-large.jp","-t200x200.jp"))),u.push({tl_track:n[i],track:c.name,artist:a,album:r,cover:o,uri:c.uri,id:i}),i++;return t.tracks=u,e()})},t.tracks=[],t.play=function(e){return n.changeTrack(e),"playing"!==t.state?n["native"].playback.play():void 0},n.on("event:tracklistChanged",r),n.on("event:playbackStateChanged",e),n.on("state:online",function(){return r(),e()})}])}.call(this),function(){angular.module("mopidyWeb2App").controller("LibraryCtrl",["$scope",function(t){return t.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}])}.call(this),function(){"use strict";angular.module("mopidyWeb2App").directive("scrollto",function(){return function(t,n,e){var r,a,o,i;return!t.$eval(e.scrollto)||(a=$(window).scrollTop(),r=a+$(window).height(),i=$(n).offset().top,o=i+$(n).height(),r>=o&&i>=a)?void 0:$(n).parent().scrollTop($(n)[0].offsetTop-30)}})}.call(this),function(){"use strict";angular.module("mopidyWeb2App").directive("ngHover",function(){return{link:function(t,n,e){return $(n).hover(function(){return $(this).addClass(e.ngHover)},function(){return $(this).removeClass(e.ngHover)})}}})}.call(this);