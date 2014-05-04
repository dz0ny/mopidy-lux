'use strict'

describe 'Controller: DiscoverCtrl', ->

  # load the controller's module
  beforeEach module 'newSrcApp'

  DiscoverCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    DiscoverCtrl = $controller 'DiscoverCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
