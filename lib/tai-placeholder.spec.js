/*global angular, beforeEach, describe, expect, inject, it, module*/
(function () {
    'use strict';

    var placeholderSupported;

    placeholderSupported = angular.element('<input>')[0].placeholder !== undefined;

    describe('taiPlaceholder', function () {
        describe('when starting with a value', function () {
            var element, scope;

            beforeEach(module('taiPlaceholder'));
            beforeEach(inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                element = $compile('<input ng-model="something" placeholder="XYZ" />')(scope);
                scope.$apply(function () {
                    scope.something = "This is text";
                });
            }));

            describe('initially', function () {
                it('does not have the placeholder class', function () {
                    expect(element.hasClass('placeholder')).toBe(false);
                });
                it('returns data from val()', function () {
                    expect(element.val()).toBe('This is text');
                });
            });
            describe('after scope change to remove data', function () {
                beforeEach(function () {
                    scope.$apply(function () {
                        scope.something = null;
                    });
                });
                it('has the placeholder class', function () {
                    expect(element.hasClass('placeholder')).toBe(true);
                });
                it('returns the right data from val()', function () {
                    if (placeholderSupported) {
                        expect(element.val()).toBe('');  // Not null
                    } else {
                        expect(element.val()).toBe('XYZ');
                    }
                });
            });
        });

        describe('when starting with no value', function () {
            var element, scope;

            beforeEach(module('taiPlaceholder'));
            beforeEach(inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                element = $compile('<input ng-model="something" placeholder="XYZ" />')(scope);
                scope.$apply();
            }));

            describe('initially', function () {
                it('has the placeholder class', function () {
                    expect(element.hasClass('placeholder')).toBe(true);
                });
                it('returns placeholder text from val()', function () {
                    // If this is IE8 or IE9 we have different expectations
                    if (placeholderSupported) {
                        expect(element.val()).toBe('');
                    } else {
                        expect(element.val()).toBe('XYZ');
                    }
                });
            });
            describe('after scope change to add data', function () {
                beforeEach(function () {
                    scope.$apply(function () {
                        scope.something = "user entered text";
                    });
                });
                it('does not have the placeholder class', function () {
                    expect(element.hasClass('placeholder')).toBe(false);
                });
                it('returns the right data from val()', function () {
                    expect(element.val()).toBe('user entered text');
                });
            });
        });
    });
}());
