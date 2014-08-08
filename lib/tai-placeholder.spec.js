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

        describe('don\'t handle password fields', function () {
            var element, scope;

            beforeEach(module('taiPlaceholder'));
            beforeEach(inject(function ($rootScope) {
                scope = $rootScope.$new();
            }));

            it('even if it has a placeholder', inject(function ($compile) {
                element = $compile('<input type="password" ng-model="something" placeholder="XYZ" />')(scope);

                /* Internally the code always says that placeholder
                 * is not supported for password fields.  That makes the
                 * test the same for whether or not placeholderSupported
                 * is true.
                 */
                expect(element.val()).toBe('');
                expect(element.hasClass('placeholder')).toBe(false);

                /* Changing the value on scope and then calling elemtn.val()
                 * should provide the value from scope.
                 */
                scope.$apply(function () {
                    scope.something = "password";
                });
                expect(element.val()).toBe('password');
                expect(element.hasClass('placeholder')).toBe(false);
            }));

        });
    });
}());
