'use strict'

describe 'Controller: SearchCtrl', ->

  # load the controller's module
  beforeEach module 'newSrcApp'

  SearchCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    SearchCtrl = $controller 'SearchCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
