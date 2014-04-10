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

    var childLinkMatchesPath = function(elm) {
      var links = elm.find('a');
      var found = false;
      angular.forEach(links, function(link) {
        var href = angular.element(link).attr('href');
        if ( matchesHref(href) ) { found = true; }
      });
      return found;
    };

    var link = function(scope, element, attrs) {
      if ( matchesPath(attrs) || childLinkMatchesPath(element) ) {
        element.addClass('active');
      }
    };

    return {
      restrict: 'A',
      scope: true,
      link: link
    };

  });
