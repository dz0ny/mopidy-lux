"use strict"
angular.module("mopidyWeb2App").directive "ngHover", ->
  link: (scope, element, attr) ->
    $(element).hover (->
      $(this).addClass attr.ngHover
    ), ->
      $(this).removeClass attr.ngHover

