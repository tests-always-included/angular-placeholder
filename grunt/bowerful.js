module.exports = function (grunt) {
    'use strict';

    grunt.config('bowerful', {
        dev: {
            packages: {
                angular: "~1.2",
                "angular-mocks": "~1.2"
            }
        }
    });
};
