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
        function ($document) {
            // Determine if we need to perform the visual shimming
            angular.forEach([ 'INPUT', 'TEXTAREA' ], function (val) {
                needsShimByNodeName[val] = $document[0].createElement(val)[propName] === undef;
            });

            return {
                require: "ngModel",
                restrict: "A",
                link: function ($scope, $element, $attributes, $controller) {
                    var className, currentValue, text;

                    text = $attributes[propName];
                    className = $attributes[propName + "Class"] || propName;

                    // This does the class toggling depending on if there
                    // is a value or not.
                    $scope.$watch($attributes.ngModel, function (newVal) {
                        currentValue = newVal || "";

                        if (!currentValue) {
                            $element.addClass(className);
                        } else {
                            $element.removeClass(className);
                        }
                    });

                    if (needsShimByNodeName[$element[0].nodeName]) {
                        // These bound events handle user interaction
                        $element.bind("focus", function () {
                            if (currentValue === "") {
                                // Remove placeholder text
                                $element.val("");
                            }
                        });
                        $element.bind("blur", function () {
                            if ($element.val() === "") {
                                // Add placeholder text
                                $element.val(text);
                            }
                        });

                        // This determines if we show placeholder text or not
                        // when there was a change detected on scope.
                        $controller.$formatters.unshift(function (val) {
                            // Show placeholder text instead of empty value
                            return val || text;
                        });
                    }
                }
            };
        }
    ]);
}());
