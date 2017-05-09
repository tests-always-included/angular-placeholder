/**
 * Placeholder for non-HTML5 browsers ... specifically IE8 and IE9, but also
 * works with Firefox 3 and possibly others.
 *
 * Always toggles on/off the placeholder class (default is "placeholder").
 * Shims in the visual effects for older IE.
 *
 * Quick Usage:
 *
 *     <input ng-model="xyz" placeholder="Enter Value" />
 *
 *     <textarea ng-model="xyz" placeholder="Enter Value"
 *         placeholder-class="placeholder"></textarea>
 *
 * Styling:
 *
 * Browsers still use specific placeholder selectors.  IE8 and 9 can now style
 * the text with a `placeholder` class.
 *
 *     .placeholder { color: red; }
 *
 * @link https://github.com/tests-always-included/angular-placeholder
 * @license MIT
 */


/*global angular*/
(function (undef) {
    "use strict";

    var propName, needsShimByNodeName;

    propName = 'placeholder';
    needsShimByNodeName = {};

    angular.module("taiPlaceholder", []).directive("placeholder", [
        "$document",
        "$timeout",
        function ($document, $timeout) {
            // Determine if we need to perform the visual shimming
            angular.forEach([ 'INPUT', 'TEXTAREA' ], function (val) {
                needsShimByNodeName[val] = $document[0].createElement(val)[propName] === undef;
            });

            /**
             * Determine if a given type (string) is a password field
             *
             * @param {string} type
             * @return {boolean}
             */
            function isPasswordType(type) {
                return type && type.toLowerCase() === "password";
            }

            return {
                require: "^ngModel",
                restrict: "A",
                link: function ($scope, $element, $attributes, $controller) {
                    /*jslint unparam:true*/
                    var className, needsShim, text;

                    text = $attributes[propName];
                    className = $attributes[propName + "Class"] || propName;
                    needsShim = needsShimByNodeName[$element[0].nodeName];

                    // On blur, check the value.  If nothing is entered then
                    // add the placeholder class and text.
                    $element.bind("blur", function () {
                        var currentValue;

                        currentValue = $element.val();

                        if (!currentValue) {
                            $element.addClass(className);

                            if (needsShim) {
                                /* Add a delay so the value isn't assigned to
                                 * scope.  Issue #9
                                 */
                                $timeout(function () {
                                    $element.val(text);
                                }, 1);
                            }
                        }
                    });

                    // When focused, check if the field has the placeholder
                    // class.  If so, wipe the field out.
                    $element.bind("focus", function () {
                        if (needsShim && $element.hasClass(className)) {
                            $element.val("");
                        }

                        $element.removeClass(className);
                    });

                    if (needsShim) {
                        // This determines if we show placeholder text or not
                        // when there was a change detected on scope.
                        $controller.$formatters.unshift(function (val) {
                            /* Do nothing on password fields, as they would
                             * be filled with asterisks.  Issue #2.
                             */
                            if (isPasswordType($element.prop("type"))) {
                                return val;
                            }

                            // When there is a value, this is not a placeholder.
                            if (val) {
                                $element.removeClass(className);

                                return val;
                            }

                            $element.addClass(className);

                            return text;
                        });
                    }

                    // Update the class on scope changes.
                    $scope.$watch(function () {
                        return $element.val();
                    }, function (newVal) {
                        if (newVal) {
                            $element.removeClass(className);
                        } else {
                            $element.addClass(className);
                        }
                    });
                }
            };
        }
    ]);
}());

if (module && module.exports) {
    module.exports = "taiPlaceholder";
}
