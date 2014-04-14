module.exports = function (grunt) {
    'use strict';

    var config, sauceConfig, sauceLaunchers;

    // Limit to 3 for a FOSS account
    sauceLaunchers = {
        /*
        sl_win7_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'Windows 7'
        },
        */
        sl_win7_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            platform: 'Windows 7'
        },
        sl_osx109_iphone: {
            base: 'SauceLabs',
            browserName: 'iphone',
            platform: 'OS X 10.9'
        },
        /*
        sl_win81_ie11: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8.1',
            version: '11'
        },
        sl_win8_ie10: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8',
            version: '10'
        },
        sl_win7_ie9: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 7',
            version: '9'
        },
        */
        sl_winxp_ie8: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows XP',
            version: '8'
        }
    };

    sauceConfig = {
        browserDisconnectTimeout: 10000,
        browserDisconnectTolerance: 2,
        browserNoActivityTimeout: 20000,
        browsers: Object.keys(sauceLaunchers),
        captureTimeout: 120000,
        configFile: 'util/config/karma.conf.js',
        customLaunchers: sauceLaunchers,
        reporters: [
            'dots',
            'saucelabs'
        ],
        sauceLabs: {
            accessKey: process.env.SAUCE_ACCESS_KEY,
            testName: 'angular-placeholder tests',
            username: process.env.SAUCE_USERNAME
        }
    };

    if (process.env.TRAVIS) {
        sauceConfig.sauceLabs.build = 'Travis #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')';
        sauceConfig.sauceLabs.startConnect = false;  // Started via Travis instead
        sauceConfig.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;

        // Remove this once SauceLabs supports websockets - see angular/angular.js/karma-shared.conf.js
        sauceConfig.transports = [
            'xhr-polling'
        ];
    }

    config = {
        sauce: sauceConfig,
        unit: {
            configFile: 'util/config/karma.conf.js'
        },
        watch: {
            configFile: 'util/config/karma.conf.js',
            autoWatch: true,
            autoWatchBatchDelay: 1000,
            singleRun: false
        }
    };

    grunt.config('karma', config);
};
