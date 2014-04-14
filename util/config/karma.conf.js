module.exports = function (config) {
    'use strict';

    config.set({
        autoWatch: false,
        basePath: '../..',
        browsers: [
            'PhantomJS'
        ],
        captureTimeout: 60000,
        colors: true,
        files: [
            'components/angular/angular.js',
            'components/angular-mocks/angular-mocks.js',
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
