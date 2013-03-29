'use strict';

angular.module('mopidyWeb2App')
  .directive('scrollto', function () {
    return function (scope, element, attributes) {
        if (scope.$eval(attributes.scrollto)) {
            window.scrollTo(0, element[0].offsetTop - 100);
        }
    }
  });
