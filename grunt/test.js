module.exports = function (grunt) {
    'use strict';

    var tasks;

    if (process.env.TRAVIS) {
        tasks = [
            "default",
            "karma:sauce"
        ];
    } else {
        tasks = [
            "default",
            "karma:unit"
        ];
    }

    grunt.registerTask("test", tasks);
};
