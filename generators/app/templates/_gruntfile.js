'use strict';

var _ = require('lodash');
var path = require('path');

module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: 'app',
            scripts: 'scripts',
            styles: 'styles',
            images: 'images'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%%= yeoman.app %>/<%%= yeoman.scripts %>/**/*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['<%%= yeoman.app %>/<%%= yeoman.styles %>/**/*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%%= yeoman.app %>/*.html',
                    '<%%= yeoman.app %>/templates/**/*.html',
                    '.tmp/<%%= yeoman.styles %>/**/*.css',
                    '<%%= yeoman.app %>/<%%= yeoman.images %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: 'www'
                }
            },
            coverage: {
                options: {
                    port: 9002,
                    open: true,
                    base: ['coverage']
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/<%%= yeoman.scripts %>/**/*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/unit/**/*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            'www/*',
                            '!www/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/<%%= yeoman.styles %>/',
                        src: '{,*/}*.css',
                        dest: '.tmp/<%%= yeoman.styles %>/'
                    }
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%%= yeoman.app %>/index.html',
            options: {
                dest: 'www',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on the useminPrepare configuration
        usemin: {
            html: ['www/**/*.html'],
            css: ['www/<%%= yeoman.styles %>/**/*.css'],
            options: {
                assetsDirs: ['www']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        cssmin: {
            options: {
                root: '<%%= yeoman.app %>',
                noRebase: true
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'www',
                        src: ['*.html', 'templates/**/*.html'],
                        dest: 'www'
                    }
                ]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%%= yeoman.app %>',
                        dest: 'www',
                        src: [
                            'images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                            '*.html',
                            'templates/**/*.html',
                            'fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/<%%= yeoman.images %>',
                        dest: 'www/<%%= yeoman.images %>',
                        src: ['generated/*']
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%%= yeoman.app %>/<%%= yeoman.styles %>',
                dest: '.tmp/<%%= yeoman.styles %>/',
                src: '{,*/}*.css'
            },
            fonts: {
                expand: true,
                cwd: 'app/bower_components/ionic/release/fonts/',
                dest: '<%%= yeoman.app %>/fonts/',
                src: '*'
            },
            vendor: {
                expand: true,
                cwd: '<%%= yeoman.app %>/vendor',
                dest: '.tmp/<%%= yeoman.styles %>/',
                src: '{,*/}*.css'
            },
            all: {
                expand: true,
                cwd: '<%%= yeoman.app %>/',
                src: '**',
                dest: 'www/'
            }
        },

        concurrent: {
            server: [
                'copy:styles',
                'copy:vendor',
                'copy:fonts'
            ],
            test: [
                'copy:styles',
                'copy:vendor',
                'copy:fonts'
            ],
            dist: [
                'copy:styles',
                'copy:vendor',
                'copy:fonts'
            ]
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });
};