'use strict'

angular.module('newSrcApp')
  .filter 'uriEncode', ($window)->
    $window.encodeURIComponent
