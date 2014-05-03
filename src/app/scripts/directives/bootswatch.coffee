'use strict'

angular.module('newSrcApp')
  .directive('bootswatch', ->
    template: '''<form><select>
                  <option ng-repeat="theme in ['amelia','cerulean','cosmo','cyborg','darkly','flatly','journal','lumen','readable','simplex','slate','spacelab','superhero','united','yeti']" value="{{theme}}">{{theme}}</option>
                </select></form>'''
    restrict: 'EA'
    link: (scope, element, attrs) ->
      element.bind "change", (event)->
        angular.element("head link:nth(0)").attr("href", "//netdna.bootstrapcdn.com/bootswatch/3.1.1/#{event.target.value}/bootstrap.min.css")          
  )
