'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        eslint: {
            target: [
                'Gruntfile.js',
                'tasks/**/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                configFile: './tasks/util/eslint.json'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        devbliss: {
            defaultOptions: {
                options: {},
                files: {
                    'tmp/defaultOptions': [
                        'test/fixtures/testing',
                        'test/fixtures/123'
                    ]
                }
            },
            customOptions: {
                options: {
                    separator: ': ',
                    punctuation: ' !!!'
                },
                files: {
                    'tmp/customOptions': [
                        'test/fixtures/testing',
                        'test/fixtures/123'
                    ]
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-internal');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'devbliss', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['eslint', 'test']);

};
