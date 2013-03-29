'use strict';

describe('Directive: ngHover', function () {
  beforeEach(module('mopidyWeb2App'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<ng-hover></ng-hover>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the ngHover directive');
  }));
});
