'use strict'

angular.module('newSrcApp')
  .directive('bootswatch', ->
    template: '''<form><select class="form-control">
                  <option ng-repeat="theme in ['cerulean', 'cosmo', 'cyborg', 'darkly', 'flatly', 'journal', 'lumen', 'paper', 'readable', 'sandstone', 'simplex', 'slate', 'spacelab', 'superhero', 'united', 'yeti']" value="{{theme}}">{{theme}}</option>
                </select></form>'''
    restrict: 'EA'
    link: (scope, element, attrs) ->
      element.bind "change", (event)->
        angular.element("head link:nth(0)").attr("href", "//netdna.bootstrapcdn.com/bootswatch/latest/#{event.target.value}/bootstrap.min.css")          
  )
