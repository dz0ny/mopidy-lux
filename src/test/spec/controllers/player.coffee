'use strict'

describe 'Controller: PlayerCtrl', ->

  # load the controller's module
  beforeEach module 'newSrcApp'

  PlayerCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    PlayerCtrl = $controller 'PlayerCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
