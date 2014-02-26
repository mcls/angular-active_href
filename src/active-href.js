'use strict';

angular.module('activeHref', [])

  .directive('activeHref', function($location) {
    var link = function(scope, element, attrs) {
      if (!attrs.href) { return; }
      var href = attrs.href.replace(/^\/#/, '');
      if ($location.path() === href) {
        element.addClass('active');
      }
    };

    return {
      restrict: 'A',
      scope: true,
      link: link
    };

  });
