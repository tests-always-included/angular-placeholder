module.exports = function (config) {
    'use strict';

    config.set({
        basePath: '../..',
        frameworks: [
            'jasmine'
        ],
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'lib/*.js'
        ],
        reporters: [
            'progress'
        ],
        port: 9876,
        colors: true,
        autoWatch: false,
        browsers: [
            'PhantomJS'
        ],
        captureTimeout: 60000,
        singleRun: true
    });
};
