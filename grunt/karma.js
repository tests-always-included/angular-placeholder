module.exports = function (grunt) {
    'use strict';

    var config;

    config = {
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
