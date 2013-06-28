(function(){"use strict";angular.module("mopidyLuxApp",[]).config(["$routeProvider",function(t){return t.when("/library/:section",{templateUrl:"views/LibrarySection.html",controller:"LibrarySectionCtrl"}).when("/",{templateUrl:"views/LibrarySearch.html",controller:"LibrarySearchCtrl"}).otherwise({redirectTo:"/"})}])}).call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("LibrarySearchCtrl",["$scope",function(t){return t.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("LibrarySectionCtrl",["$scope","mopidy","$routeParams",function(t,n,r){var e;return t.section=r.section,e=function(){return"albums"===t.section&&n.getAlbums(function(n){return t.results=n}),"artists"===t.section?n.getArtists(function(n){return t.results=n}):void 0},n.isConnected()&&e(),n.on("state:online",function(){return e()})}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("LibraryCtrl",["$scope","mopidy","$route",function(){}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("PlayerCtrl",["$scope","mopidy",function(t,n){var r,e,a,i,o;return r=!1,a=function(n){return t.track_position_time=n,t.track_position=100*(t.track_position_time/t.track_length),i()},i=function(){return"playing"===t.state?(clearInterval(r),r=setTimeout(function(){return t.$apply(function(){return a(t.track_position_time+1500)})},1500)):clearInterval(r)},e=function(e){var i;return e?(t.track=e.name,t.artist=e.artists?e.artists[0].name:!1,t.album=e.album?e.album.name:!1,e.album.images?(i=e.album.images[0],t.cover=i):t.cover=!1,e.length?(t.track_length=e.length,n.getTimePosition(a)):(t.track_length=0,clearInterval(r))):(t.album=!1,t.artist=!1,t.cover=!1,t.track=!1,t.track_length=0,t.track_position=0,clearTimeout(r))},o=function(t){return e(t.tl_track.track),i()},n.on("event:trackPlaybackStarted",o),n.on("event:trackPlaybackPaused",o),n.on("event:trackPlaybackEnded",o),n.on("event:seeked",a),n.on("event:playbackStateChanged",function(r){return t.state=r.new_state,n.getTimePosition(a),console.log("$scope.state",t.state)}),n.on("state:online",function(){return n.getCurrentTrack(e),n.getState(function(r){return t.state=r,n.getTimePosition(a)})}),t.seek=function(r){var e;return 0===r.button?(e=r.offsetX/r.currentTarget.clientWidth*t.track_length,n["native"].playback.seek(e),r.preventDefault()):void 0},t.play=function(){return n["native"].playback.play()},t.stop=function(){return n["native"].playback.stop()},t.pause=function(){return n["native"].playback.pause()},t.next=function(){return n["native"].playback.next()},t.prev=function(){return n["native"].playback.previous()}}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("TracklistCtrl",["$scope","mopidy",function(t,n){var r,e;return r=function(){return n.getState(function(n){return t.state=n}),n.getTracklistPosition(function(n){return t.current_track=n})},e=function(){return n.getTracklist(function(n){var e,a,i,o,u,c;for(c=[],o=0;n.length>o;)u=n[o].track,a="",u.artists&&(a=u.artists[0].name),e=!1,u.album&&(e=u.album.name),i=!1,u.album.images&&(i=u.album.images[0],/sndcdn/.test(i)&&(i=i.replace("-large.jp","-t200x200.jp"))),c.push({tl_track:n[o],track:u.name,artist:a,album:e,cover:i,uri:u.uri,id:o}),o++;return t.tracks=c,r()})},t.tracks=[],t.play=function(r){return n.changeTrack(r),"playing"!==t.state?n["native"].playback.play():void 0},n.on("event:tracklistChanged",e),n.on("event:playbackStateChanged",r),n.on("state:online",function(){return e(),r()})}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").directive("ngHover",function(){return{link:function(t,n,r){return $(n).hover(function(){return $(this).addClass(r.ngHover)},function(){return $(this).removeClass(r.ngHover)})}}})}.call(this),function(){"use strict";angular.module("mopidyLuxApp").directive("scrollto",function(){return function(t,n,r){var e,a,i,o;return!t.$eval(r.scrollto)||(a=$(window).scrollTop(),e=a+$(window).height(),o=$(n).offset().top,i=o+$(n).height(),e>=i&&o>=a)?void 0:$(n).parent().scrollTop($(n)[0].offsetTop-30)}})}.call(this),function(){"use strict";angular.module("mopidyLuxApp").factory("mopidy",["$rootScope",function(t){var n,r,e,a,i;return n={albums:!1,artists:!1},r=function(n,r){return e.on(n,function(n){return t.$apply(function(){return r(n)})})},i=function(t){return"http://coverartarchive.org/release/"+t+"/front"},a=function(r){return n.artists&&n.albums?r(n.albums,n.artists):e.library.search().then(function(e){var a,i,o,u,c,l,s,p,f,m,g;for(a=[],i=[],s=0,f=e.length;f>s;s++)if(o=e[s],u=[],c=[],o.tracks)for(g=o.tracks,p=0,m=g.length;m>p;p++)l=g[p],_.contains(u,l.album.name)||(u.push(l.album.name),a.push({name:l.album.name,art:_.first(l.album.images),backend:o.uri,model:"album"})),_.contains(c,_.first(l.artists).name)||(c.push(_.first(l.artists).name),i.push({name:_.first(l.artists).name,art:_.first(l.album.images),backend:o.uri,model:"artist"}));return n.artists=i,n.albums=a,t.$apply(function(){return r(a,i)})})},e=new Mopidy,window.mop=e,r("state:online",function(){return t.isConnected=!0}),r("state:offline",function(){return t.isConnected=!1}),{isConnected:function(){return t.isConnected},on:r,emit:e.emit,"native":e,getCurrentTrack:function(n){return e.playback.getCurrentTrack().then(function(r){return t.$apply(function(){return n(r)})})},changeTrack:function(t){return e.playback.changeTrack(t)},getTracklistPosition:function(n){return e.playback.getTracklistPosition().then(function(r){return t.$apply(function(){return n(r)})})},getTracklist:function(n){return e.tracklist.getTlTracks().then(function(r){return t.$apply(function(){return n(r)})})},getState:function(n){return e.playback.getState().then(function(r){return t.$apply(function(){return n(r)})})},getTimePosition:function(n){return e.playback.getTimePosition().then(function(r){return t.$apply(function(){return n(r)})})},getAlbums:function(t){return a(function(n){return t(n)})},getArtists:function(t){return a(function(n,r){return t(r)})}}}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp",[]).config(["$routeProvider",function(t){return t.when("/library/:section",{templateUrl:"views/LibrarySection.html",controller:"LibrarySectionCtrl"}).when("/",{templateUrl:"views/LibrarySearch.html",controller:"LibrarySearchCtrl"}).otherwise({redirectTo:"/"})}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("LibrarySearchCtrl",["$scope",function(t){return t.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("LibrarySectionCtrl",["$scope","mopidy","$routeParams",function(t,n,r){var e;return t.section=r.section,e=function(){return"albums"===t.section&&n.getAlbums(function(n){return t.results=n}),"artists"===t.section?n.getArtists(function(n){return t.results=n}):void 0},n.isConnected()&&e(),n.on("state:online",function(){return e()})}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("LibraryCtrl",["$scope","mopidy","$route",function(){}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("PlayerCtrl",["$scope","mopidy",function(t,n){var r,e,a,i,o;return r=!1,a=function(n){return t.track_position_time=n,t.track_position=100*(t.track_position_time/t.track_length),i()},i=function(){return"playing"===t.state?(clearInterval(r),r=setTimeout(function(){return t.$apply(function(){return a(t.track_position_time+1500)})},1500)):clearInterval(r)},e=function(e){var i;return e?(t.track=e.name,t.artist=e.artists?e.artists[0].name:!1,t.album=e.album?e.album.name:!1,e.album.images?(i=e.album.images[0],t.cover=i):t.cover=!1,e.length?(t.track_length=e.length,n.getTimePosition(a)):(t.track_length=0,clearInterval(r))):(t.album=!1,t.artist=!1,t.cover=!1,t.track=!1,t.track_length=0,t.track_position=0,clearTimeout(r))},o=function(t){return e(t.tl_track.track),i()},n.on("event:trackPlaybackStarted",o),n.on("event:trackPlaybackPaused",o),n.on("event:trackPlaybackEnded",o),n.on("event:seeked",a),n.on("event:playbackStateChanged",function(r){return t.state=r.new_state,n.getTimePosition(a),console.log("$scope.state",t.state)}),n.on("state:online",function(){return n.getCurrentTrack(e),n.getState(function(r){return t.state=r,n.getTimePosition(a)})}),t.seek=function(r){var e;return 0===r.button?(e=r.offsetX/r.currentTarget.clientWidth*t.track_length,n["native"].playback.seek(e),r.preventDefault()):void 0},t.play=function(){return n["native"].playback.play()},t.stop=function(){return n["native"].playback.stop()},t.pause=function(){return n["native"].playback.pause()},t.next=function(){return n["native"].playback.next()},t.prev=function(){return n["native"].playback.previous()}}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").controller("TracklistCtrl",["$scope","mopidy",function(t,n){var r,e;return r=function(){return n.getState(function(n){return t.state=n}),n.getTracklistPosition(function(n){return t.current_track=n})},e=function(){return n.getTracklist(function(n){var e,a,i,o,u,c;for(c=[],o=0;n.length>o;)u=n[o].track,a="",u.artists&&(a=u.artists[0].name),e=!1,u.album&&(e=u.album.name),i=!1,u.album.images&&(i=u.album.images[0],/sndcdn/.test(i)&&(i=i.replace("-large.jp","-t200x200.jp"))),c.push({tl_track:n[o],track:u.name,artist:a,album:e,cover:i,uri:u.uri,id:o}),o++;return t.tracks=c,r()})},t.tracks=[],t.play=function(r){return n.changeTrack(r),"playing"!==t.state?n["native"].playback.play():void 0},n.on("event:tracklistChanged",e),n.on("event:playbackStateChanged",r),n.on("state:online",function(){return e(),r()})}])}.call(this),function(){"use strict";angular.module("mopidyLuxApp").directive("ngHover",function(){return{link:function(t,n,r){return $(n).hover(function(){return $(this).addClass(r.ngHover)},function(){return $(this).removeClass(r.ngHover)})}}})}.call(this),function(){"use strict";angular.module("mopidyLuxApp").directive("scrollto",function(){return function(t,n,r){var e,a,i,o;return!t.$eval(r.scrollto)||(a=$(window).scrollTop(),e=a+$(window).height(),o=$(n).offset().top,i=o+$(n).height(),e>=i&&o>=a)?void 0:$(n).parent().scrollTop($(n)[0].offsetTop-30)}})}.call(this),function(){"use strict";angular.module("mopidyLuxApp").factory("mopidy",["$rootScope",function(t){var n,r,e,a,i;return n={albums:!1,artists:!1},r=function(n,r){return e.on(n,function(n){return t.$apply(function(){return r(n)})})},i=function(t){return"http://coverartarchive.org/release/"+t+"/front"},a=function(r){return n.artists&&n.albums?r(n.albums,n.artists):e.library.search().then(function(e){var a,i,o,u,c,l,s,p,f,m,g;for(a=[],i=[],s=0,f=e.length;f>s;s++)if(o=e[s],u=[],c=[],o.tracks)for(g=o.tracks,p=0,m=g.length;m>p;p++)l=g[p],_.contains(u,l.album.name)||(u.push(l.album.name),a.push({name:l.album.name,art:_.first(l.album.images),backend:o.uri,model:"album"})),_.contains(c,_.first(l.artists).name)||(c.push(_.first(l.artists).name),i.push({name:_.first(l.artists).name,art:_.first(l.album.images),backend:o.uri,model:"artist"}));return n.artists=i,n.albums=a,t.$apply(function(){return r(a,i)})})},e=new Mopidy,window.mop=e,r("state:online",function(){return t.isConnected=!0}),r("state:offline",function(){return t.isConnected=!1}),{isConnected:function(){return t.isConnected},on:r,emit:e.emit,"native":e,getCurrentTrack:function(n){return e.playback.getCurrentTrack().then(function(r){return t.$apply(function(){return n(r)})})},changeTrack:function(t){return e.playback.changeTrack(t)},getTracklistPosition:function(n){return e.playback.getTracklistPosition().then(function(r){return t.$apply(function(){return n(r)})})},getTracklist:function(n){return e.tracklist.getTlTracks().then(function(r){return t.$apply(function(){return n(r)})})},getState:function(n){return e.playback.getState().then(function(r){return t.$apply(function(){return n(r)})})},getTimePosition:function(n){return e.playback.getTimePosition().then(function(r){return t.$apply(function(){return n(r)})})},getAlbums:function(t){return a(function(n){return t(n)})},getArtists:function(t){return a(function(n,r){return t(r)})}}}])}.call(this);