"use strict"
angular.module("mopidyLuxApp").directive "ngHover", ->
  link: (scope, element, attr) ->
    $(element).hover (->
      $(this).addClass attr.ngHover
    ), ->
      $(this).removeClass attr.ngHover

