(function(){"use strict";angular.module("mopidyLuxApp",[]).config(["$routeProvider",function(e){return e.when("/library/:section",{templateUrl:"views/LibrarySection.html",controller:"LibrarySectionCtrl"}).when("/",{templateUrl:"views/LibrarySearch.html",controller:"LibrarySearchCtrl"}).otherwise({redirectTo:"/"})}])}).call(this),function(){"use strict";angular.module("mopidyLuxApp").factory("mopidy",["$rootScope",function(e){var t,n,r,i,o;return t={albums:!1,artists:!1},n=function(t,n){return r.on(t,function(t){return e.$apply(function(){return n(t)})})},o=function(e){return"http://coverartarchive.org/release/"+e+"/front"},i=function(n){return t.artists&&t.albums?n(t.albums,t.artists):r.library.search().then(function(r){var i,o,a,u,s,c,l,f,p,h,d;for(i=[],o=[],l=0,p=r.length;p>l;l++)if(a=r[l],u=[],s=[],a.tracks)for(d=a.tracks,f=0,h=d.length;h>f;f++)c=d[f],_.contains(u,c.album.name)||(u.push(c.album.name),i.push({name:c.album.name,art:_.first(c.album.images),backend:a.uri,model:"album"})),_.contains(s,_.first(c.artists).name)||(s.push(_.first(c.artists).name),o.push({name:_.first(c.artists).name,art:_.first(c.album.images),backend:a.uri,model:"artist"}));return t.artists=o,t.albums=i,e.$apply(function(){return n(i,o)})})},r=new Mopidy,window.mop=r,n("state:online",function(){return e.isConnected=!0}),n("state:offline",function(){return e.isConnected=!1}),{isConnected:function(){return e.isConnected},on:n,emit:r.emit,"native":r,getCurrentTrack:function(t){return r.playback.getCurrentTrack().then(function(n){return e.$apply(function(){return t(n)})})},changeTrack:function(e){return r.playback.changeTrack(e)},getTracklistPosition:function(t){return r.playback.getTracklistPosition().then(function(n){return e.$apply(function(){return t(n)})})},getTracklist:function(t){return r.tracklist.getTlTracks().then(function(n){return e.$apply(function(){return t(n)})})},getState:function(t){return r.playback.getState().then(function(n){return e.$apply(function(){return t(n)})})},getTimePosition:function(t){return r.playback.getTimePosition().then(function(n){return e.$apply(function(){return t(n)})})},getAlbums:function(e){return i(function(t){return e(t)})},getArtists:function(e){return i(function(t,n){return e(n)})}}}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("PlayerCtrl",["$scope","mopidy",function(e,t){var n,r,i,o,a;return n=!1,i=function(t){return e.track_position_time=t,e.track_position=100*(e.track_position_time/e.track_length),o()},o=function(){return"playing"===e.state?(clearInterval(n),n=setTimeout(function(){return e.$apply(function(){return i(e.track_position_time+1500)})},1500)):clearInterval(n)},r=function(r){var o;return r?(e.track=r.name,e.artist=r.artists?r.artists[0].name:!1,e.album=r.album?r.album.name:!1,r.album.images?(o=r.album.images[0],e.cover=o):e.cover=!1,r.length?(e.track_length=r.length,t.getTimePosition(i)):(e.track_length=0,clearInterval(n))):(e.album=!1,e.artist=!1,e.cover=!1,e.track=!1,e.track_length=0,e.track_position=0,clearTimeout(n))},a=function(e){return r(e.tl_track.track),o()},t.on("event:trackPlaybackStarted",a),t.on("event:trackPlaybackPaused",a),t.on("event:trackPlaybackEnded",a),t.on("event:seeked",i),t.on("event:playbackStateChanged",function(n){return e.state=n.new_state,t.getTimePosition(i),console.log("$scope.state",e.state)}),t.on("state:online",function(){return t.getCurrentTrack(r),t.getState(function(n){return e.state=n,t.getTimePosition(i)})}),e.seek=function(n){var r;return 0===n.button?(r=n.offsetX/n.currentTarget.clientWidth*e.track_length,t["native"].playback.seek(r),n.preventDefault()):void 0},e.play=function(){return t["native"].playback.play()},e.stop=function(){return t["native"].playback.stop()},e.pause=function(){return t["native"].playback.pause()},e.next=function(){return t["native"].playback.next()},e.prev=function(){return t["native"].playback.previous()}}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("TracklistCtrl",["$scope","mopidy",function(e,t){var n,r;return n=function(){return t.getState(function(t){return e.state=t}),t.getTracklistPosition(function(t){return e.current_track=t})},r=function(){return t.getTracklist(function(t){var r,i,o,a,u,s;for(s=[],a=0;t.length>a;)u=t[a].track,i="",u.artists&&(i=u.artists[0].name),r=!1,u.album&&(r=u.album.name),o=!1,u.album.images&&(o=u.album.images[0],/sndcdn/.test(o)&&(o=o.replace("-large.jp","-t200x200.jp"))),s.push({tl_track:t[a],track:u.name,artist:i,album:r,cover:o,uri:u.uri,id:a}),a++;return e.tracks=s,n()})},e.tracks=[],e.play=function(n){return t.changeTrack(n),"playing"!==e.state?t["native"].playback.play():void 0},t.on("event:tracklistChanged",r),t.on("event:playbackStateChanged",n),t.on("state:online",function(){return r(),n()})}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("LibraryCtrl",["$scope","mopidy","$route",function(){}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").directive("scrollto",function(){return function(e,t,n){var r,i,o,a;return!e.$eval(n.scrollto)||(i=$(window).scrollTop(),r=i+$(window).height(),a=$(t).offset().top,o=a+$(t).height(),r>=o&&a>=i)?void 0:$(t).parent().scrollTop($(t)[0].offsetTop-30)}})}.call(this),function(){"use strict";angular.module("mopidyLuxApp").directive("ngHover",function(){return{link:function(e,t,n){return $(t).hover(function(){return $(this).addClass(n.ngHover)},function(){return $(this).removeClass(n.ngHover)})}}})}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("LibrarySectionCtrl",["$scope","mopidy","$routeParams",function(e,t,n){var r;return e.section=n.section,r=function(){return"albums"===e.section&&t.getAlbums(function(t){return e.results=t}),"artists"===e.section?t.getArtists(function(t){return e.results=t}):void 0},t.isConnected()&&r(),t.on("state:online",function(){return r()})}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("LibrarySearchCtrl",["$scope",function(e){return e.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}])}.call(this);