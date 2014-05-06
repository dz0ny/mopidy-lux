'use strict'

describe 'Service: Mopidy', ->

  # load the service's module
  beforeEach module 'newSrcApp'

  # instantiate service
  Mopidy = {}
  beforeEach inject (_Mopidy_) ->
    Mopidy = _Mopidy_

  it 'should do something', ->
    expect(!!Mopidy).toBe true
