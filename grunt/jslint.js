module.exports = function (grunt) {
    'use strict';
    grunt.config('jslint', {
        all: {
            src: [
                'bower.json',
                'grunt/**/*.js',
                'Gruntfile.js',
                'lib/**/*.js',
                'package.json',
                'util/config/**/*.js'
            ],
            directives: {
                predef: [
                    'console',
                    'module',
                    'process',
                    'require'
                ]
            }
        }
    });
};
