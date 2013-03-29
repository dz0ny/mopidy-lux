'use strict';

describe('Directive: scrollto', function () {
  beforeEach(module('mopidyWeb2App'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<scrollto></scrollto>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the scrollto directive');
  }));
});
