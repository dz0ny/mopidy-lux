'use strict';

describe('Controller: TracklistCtrl', function () {

  // load the controller's module
  beforeEach(module('mopidyWeb2App'));

  var TracklistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    TracklistCtrl = $controller('TracklistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
