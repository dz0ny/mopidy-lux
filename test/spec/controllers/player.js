'use strict';

describe('Controller: PlayerCtrl', function () {

  // load the controller's module
  beforeEach(module('mopidyWeb2App'));

  var PlayerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    PlayerCtrl = $controller('PlayerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
