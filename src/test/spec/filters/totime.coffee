'use strict'

describe 'Filter: totime', ->

  # load the filter's module
  beforeEach module 'newSrcApp'

  # initialize a new instance of the filter before each test
  totime = {}
  beforeEach inject ($filter) ->
    totime = $filter 'totime'

  it 'should return the input prefixed with "totime filter:"', ->
    text = 'angularjs'
    expect(totime text).toBe ('totime filter: ' + text)
