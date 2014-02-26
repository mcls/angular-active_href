'use strict';

describe('Module: activeHref', function () {
  var scope, $sandbox, $compile, $location;

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
      element: '<a href="/#/path/to/stuff" active-href></div>'
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
    $location.path = function() {
      return '/path/to/stuff';
    };
    var elm = compileDirective();
    expect(elm.hasClass('active')).toBe(true);
  });

  it('doesn\'t the .active css class when href doesn\'t match', function () {
    $location.path = function() {
      return '/not_path/to/stuff';
    };
    var elm = compileDirective();
    expect(elm.hasClass('active')).toBe(false);
  });

});
