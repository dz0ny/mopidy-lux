'use strict';

angular.module('mopidyWeb2App')
  .directive('scrollto', function () {
    return function (scope, element, attributes) {
        if (scope.$eval(attributes.scrollto)) {
            $(element).parent().scrollTop($(element)[0].offsetTop - 30);
        }
    }
  });
