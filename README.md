Angular Placeholder Directive
=============================

This directive will shim in placeholder support for browsers that do not support placeholders.  The directive may also make styling easier by letting you combine your rules.  It does not use a jQuery plugin and simulates the behavior by adding text for input and textarea elements when they do not have focus.


Browser Support
---------------

Placeholder styling was natively implemented in IE 10, Chrome 4, Firefox 4, Safari 5, Opera 11.6.  Internet Explorer 8 and 9 do not support this natively, but many places are forced to still code for those browsers.


How to Use
----------

Using this plugin needs only three easy steps.

1.  Include the plugin into your page.

        <script src="angular-placeholder.js"></script>

2.  Make sure your element has both "ng-model" and "placeholder" attributes.

        <input type="text" ng-model="firstName" placeholder="First Name" />

        <textarea ng-model="feedback" placeholder="Provide feedback!"></textarea>

3.  Style the placeholder with some CSS.

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

* .placeholder - All browsers get this class, but IE8 and IE9 can style the text when this class is applied to the elements.
* ::-webkit-input-placeholder -  WebKit and Blink (Safari, Chrome, Opera 15+)
* :-moz-placeholder - Firefox 4 - 18
* ::-moz-placeholder - Firefox 19+
* :-ms-input-placeholder - IE 10


Testing
-------

Tests are *always* included.  You can run them with the following command.

    grunt test

If live feedback during development is what you would like, use this.

    grunt watch


LICENSE
-------

This plugin is licensed under an MIT license with an additional non-advertising clause.  See [LICENSE.md](LICENSE.md).
