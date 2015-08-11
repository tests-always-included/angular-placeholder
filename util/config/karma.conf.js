module.exports = function (config) {
    'use strict';

    config.set({
        autoWatch: false,
        basePath: '../..',
        browsers: [
            'PhantomJS'
        ],
        captureTimeout: 120000,
        colors: true,
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'lib/*.js'
        ],
        frameworks: [
            'jasmine'
        ],
        port: 9876,
        reporters: [
            'progress'
        ],
        singleRun: true
    });
};
