'use strict';

module.exports = function (grunt) {

    function loadConfig() {

        var devblissOptions = grunt.config('devbliss'),
            rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

        // External Dependencies import
        require('grunt-connect-rewrite/tasks/connect_rewrite.js')(grunt);
        require('grunt-contrib-connect/tasks/connect.js')(grunt);

        return {
            connect: {
                options: {
                    port: devblissOptions.port,
                    // Change this to '0.0.0.0' to access the server from outside.
                    //hostname: '0.0.0.0',
                    middleware: function (connect, options) {
                        var middlewares = [];
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        // Proxy all requests to target the local application.
                        var proxyOptions = require('url').parse('http://google.com/');
                        proxyOptions.route = '/api';

                        middlewares.push(require('proxy-middleware')(proxyOptions));
                        //middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

                        // RewriteRules support
                        middlewares.push(rewriteRulesSnippet);

                        // Serve static files
                        options.base.forEach(function (base) {
                            middlewares.push(connect.static(base));
                        });
                        return middlewares;
                    }
                },

                app: {
                    options: {
                        open: true,
                        livereload: devblissOptions.livereload,
                        base: ['.tmp', 'app']
                    }
                },

                dist: {
                    options: {
                        open: true,
                        base: 'dist'
                    }
                },

                distDocker: {
                    options: {
                        port: devblissOptions.port,
                        open: true,
                        base: 'app'
                    }
                },

                testApp: {
                    options: {
                        port: devblissOptions.testport,
                        base: ['.tmp', 'test', 'app']
                    }
                },

                testDist: {
                    options: {
                        port: devblissOptions.testport,
                        base: ['.tmp', 'test', 'dist']
                    }
                },

                e2eApp: {
                    options: {
                        port: devblissOptions.testport,
                        base: ['.tmp', 'test', 'app']
                    }
                }
            }
        };
    }

    grunt.registerTask('devbliss-connect', function (config) {
            grunt.config.merge(loadConfig(grunt));
            grunt.task.run(['connect:' + config]);
        }
    );
};
