'use strict'

describe 'Filter: uriEncode', ->

  # load the filter's module
  beforeEach module 'newSrcApp'

  # initialize a new instance of the filter before each test
  uriEncode = {}
  beforeEach inject ($filter) ->
    uriEncode = $filter 'uriEncode'

  it 'should return the input prefixed with "uriEncode filter:"', ->
    text = 'angularjs'
    expect(uriEncode text).toBe ('uriEncode filter: ' + text)
