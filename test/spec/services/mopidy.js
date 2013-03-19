'use strict';

describe('Service: mopidy', function () {

  // load the service's module
  beforeEach(module('mopidyWeb2App'));

  // instantiate service
  var mopidy;
  beforeEach(inject(function (_mopidy_) {
    mopidy = _mopidy_;
  }));

  it('should do something', function () {
    expect(!!mopidy).toBe(true);
  });

});
