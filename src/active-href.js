'use strict';

angular.module('activeHref', [])
  .directive('activeHref', function($location) {
    var matchesCustom = function(pattern) {
      if ( !pattern ) { return false; }
      var regex = new RegExp(pattern);
      return regex.test($location.path());
    };

    var matchesHref = function(href) {
      if ( !href ) { return false; }
      var path = href.replace(/^\/#/, '');
      return $location.path() === path;
    };

    var matchesPath = function(attrs) {
      var href = attrs.href || attrs.ngHref || attrs.boHref || attrs.boHrefI;
      return matchesHref(href) || matchesCustom(attrs.routeMatcher);
    };

    var link = function(scope, element, attrs) {
      if ( matchesPath(attrs) ) {
        element.addClass('active');
      }
    };

    return {
      restrict: 'A',
      scope: true,
      link: link
    };

  });
