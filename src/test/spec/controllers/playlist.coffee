'use strict'

describe 'Controller: PlaylistCtrl', ->

  # load the controller's module
  beforeEach module 'newSrcApp'

  PlaylistCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    PlaylistCtrl = $controller 'PlaylistCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
