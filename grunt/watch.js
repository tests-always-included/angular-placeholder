module.exports = function (grunt) {
    'use strict';
    grunt.registerTask("watch", [
        "default",
        "karma:watch"
    ]);
};
