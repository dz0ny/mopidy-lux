'use strict';

angular.module('mopidyWeb2App')
  .directive('ngHover', function () {
    return {
        link: function(scope, element, attr) {
            $(element).hover(
              function () {
                $(this).addClass(attr.ngHover);
              },
              function () {
                $(this).removeClass(attr.ngHover);
              }
            );
        }
    }
  });
