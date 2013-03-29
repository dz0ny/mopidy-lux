'use strict';

angular.module('mopidyWeb2App')
  .directive('scrollto', function () {
    return function (scope, element, attributes) {
        if (scope.$eval(attributes.scrollto)) {

            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = $(element).offset().top;
            var elemBottom = elemTop + $(element).height();

            if (!((elemBottom <= docViewBottom) && (elemTop >= docViewTop))) {
                $(element).parent().scrollTop($(element)[0].offsetTop - 30);
            };
        }
    }
  });
