"use strict"
angular.module("mopidyWeb2App").directive "scrollto", ->
  (scope, element, attributes) ->
    if scope.$eval(attributes.scrollto)
      docViewTop = $(window).scrollTop()
      docViewBottom = docViewTop + $(window).height()
      elemTop = $(element).offset().top
      elemBottom = elemTop + $(element).height()
      $(element).parent().scrollTop $(element)[0].offsetTop - 30  unless (elemBottom <= docViewBottom) and (elemTop >= docViewTop)
