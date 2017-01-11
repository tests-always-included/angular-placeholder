Angular Placeholder Directive
=============================

This directive will shim in placeholder support for browsers that do not support placeholders.  The directive may also make styling easier by letting you combine your rules.  It does not use a jQuery plugin and simulates the behavior by adding text for input and textarea elements when they do not have focus.

[![npm version][npm-badge]][npm-link]
[![Build Status][travis-badge]][travis-link]
[![Dependencies][dependencies-badge]][dependencies-link]
[![Dev Dependencies][devdependencies-badge]][devdependencies-link]


Demo
----

There's a [live demo](http://plnkr.co/edit/gVo2jM244jbIvMOYZocr) courtesy of Plunker.  In case you want some more advanced styling, there's [another demo](http://plnkr.co/edit/D5qyFXTeGh3RV81KNeva) that helps illustrate what you can do.


Browser Support
---------------

Placeholder styling was natively implemented in IE 10, Chrome 4, Firefox 4, Safari 5, Opera 11.6.  Internet Explorer 8 and 9 do not support this natively, but many places are forced to still code for those browsers.


How to Use
----------

Using this plugin needs only three easy steps.

1.  Include the plugin into your page.

        <script src="tai-placeholder.js"></script>

2.  Add this somewhere to the module dependencies for your Angular application.

        angular.module('yourApplication', [ 'taiPlaceholder' ]);

3.  Make sure your element has both "ng-model" and "placeholder" attributes.

        <input type="text" ng-model="firstName" placeholder="First Name" />

        <textarea ng-model="feedback" placeholder="Provide feedback!"></textarea>

4.  Style the placeholder with some CSS for IE8 and IE9.

        .placeholder {
            color: #aaa;
        }


Further Configuration
---------------------

There is an extra attribute that you can specify on your input tags to control the name of the class that is applied when the input should be showing placeholder text.  The default value for `placeholder-class` is "placeholder" but you can change it.

    <input type="text" ng-model="firstName" placeholder="First Name"
        placeholder-class="placeholder-blue">
    <input type="text" ng-model="lastName" placeholder="Last Name"
        placeholder-class="placeholder-red">

The above sample will apply different classes for the first name and the last name.  Using this mechanism you can style the inputs differently.  You can achieve the same effect by having your inputs use classes - the above is just one path to a goal.

To change the color of the text you still need to write some duplicate CSS.  This is what's needed to change the color to red for all browsers.

    .placeholder { color: red; }
    ::-webkit-input-placeholder { color: red; }
    :-moz-placeholder { color: red; }
    ::moz-placeholder { color: red; }
    :-ms-input-placeholder { color: red; }

The rules need to be split out because browsers must ignore rules that contain invalid CSS selectors, and the browsers don't understand other browser-specific pseudoclasses and pseudoelements.

Here's a breakdown of the selectors.

* `.placeholder` - All browsers get this class, but IE8 and IE9 can style the text when this class is applied to the elements.
* `::-webkit-input-placeholder` -  WebKit and Blink (Safari, Chrome, Opera 15+)
* `:-moz-placeholder` - Firefox 4 - 18
* `::-moz-placeholder` - Firefox 19+
* `:-ms-input-placeholder` - IE 10


Developing
----------

First, clone the repository.  Then you need to run `npm install` to get most of the dependencies and `npm run bower` for the rest.


Testing
-------

Tests are *always* included.  You can run them with the following command.  It runs the test suite with PhantomJS.

    grunt test

If live feedback during development is what you would like, use this.  It's also easier to run tests in many different browsers with this command - just open up the server with many different browsers and the tests will run in all of them.

    grunt watch


LICENSE
-------

This plugin is licensed under an MIT license with an additional non-advertising clause.  [Read full license.][LICENSE]


[codecov-badge]: https://img.shields.io/codecov/c/github/tests-always-included/angular-placeholder/master.svg
[codecov-link]: https://codecov.io/github/tests-always-included/angular-placeholder?branch=master
[dependencies-badge]: https://img.shields.io/david/tests-always-included/angular-placeholder.svg
[dependencies-link]: https://david-dm.org/tests-always-included/angular-placeholder
[devdependencies-badge]: https://img.shields.io/david/dev/tests-always-included/angular-placeholder.svg
[devdependencies-link]: https://david-dm.org/tests-always-included/angular-placeholder#info=devDependencies
[LICENSE]: LICENSE.md
[npm-badge]: https://img.shields.io/npm/v/angular-placeholder.svg
[npm-link]: https://npmjs.org/package/angular-placeholder
[travis-badge]: https://img.shields.io/travis/tests-always-included/angular-placeholder/master.svg
[travis-link]: http://travis-ci.org/tests-always-included/angular-placeholder
