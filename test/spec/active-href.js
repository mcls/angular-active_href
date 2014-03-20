'use strict';

describe('Module: activeHref', function () {
  var scope, $sandbox, $compile, $location;

  var stubLocation = function(path) {
    $location.path = function() { return path; };
  };

  // load the controller's module
  beforeEach(module('activeHref'));

  beforeEach(inject(function ($injector, $rootScope, _$compile_, _$location_) {
    scope = $rootScope;
    $compile = _$compile_;
    $location = _$location_;

    $sandbox = $('<div id="sandbox"></div>').appendTo($('body'));
  }));

  afterEach(function() {
    $sandbox.remove();
    scope.$destroy();
  });

  var templates = {
    'default': {
      scope: {},
      element: '<a href="/#/path/to/stuff" active-href></a>'
    },
    'custom_route' : {
      scope: {},
      element: '<a href="/#/something" route-matcher="/custom_path/to/stuff" active-href></a>'
    }
  };

  function compileDirective(template) {
    template = template ? templates[template] : templates['default'];
    angular.extend(scope, template.scope || templates['default'].scope);
    var $element = $(template.element).appendTo($sandbox);
    $element = $compile($element)(scope);
    scope.$digest();
    return $element;
  }

  it('adds the .active css class when href matches the current path', function () {
    stubLocation('/path/to/stuff');
    var elm = compileDirective();
    expect(elm.hasClass('active')).toBe(true);
  });

  it('doesn\'t the .active css class when href doesn\'t match', function () {
    stubLocation('/not_path/to/stuff');
    var elm = compileDirective();
    expect(elm.hasClass('active')).toBe(false);
  });

  it('uses route-matcher as pattern to check against', function () {
    stubLocation('/custom_path/to/stuff');
    var elm = compileDirective('custom_route');
    expect(elm.hasClass('active')).toBe(true);

    stubLocation('/custom_path/to/nothing');
    elm = compileDirective('custom_route');
    expect(elm.hasClass('active')).toBe(false);
  });

  it('works for all variants of the href attribute', function () {
    var attrs = [ 'href', 'ng-href', 'bo-href', 'bo-href-i' ];

    stubLocation('/path/to/stuff');
    angular.forEach(attrs, function(attr) {
      var tpl = '<a ' + attr + '="/#/path/to/stuff" active-href></a>';
      var $element = $(tpl).appendTo($sandbox);
      $element = $compile($element)(scope);
      scope.$digest();
      expect($element.hasClass('active')).toBe(true);
    });

  });

});
