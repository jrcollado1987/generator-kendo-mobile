var path = require('path');

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                reporter: require('jshint-junit-reporter'),
                reporterOutput: "output/junit-output-jshint.xml",
                jshintrc: '.jshintrc',
                ignores: ['client/scripts/require.js']
            },
            build: [
                "generators/**/*.js",
                "lib/*.js"
            ]
        },
        jscs: {
            options: {
                config: ".jscsrc",
                reporter: "junit",
                reporterOutput: "output/junit-output-jscs.xml"
            },
            all: {
                files: {
                    src: [
                        //"generators/**/*.js",
                        "./lib/**/*.js"
                        //"Gruntfile.js"
                    ]
                }
            }
        },
        nodemon: {
            debug: {
                script: path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, '\\AppData\\Roaming\\npm\\node_modules\\yo\\cli.js'),
                options: {
                    nodeArgs: ['--debug-brk'],
                    args: ['kendo-mobile'],
                    ignore: ['generated/**', 'node_modules/**', 'public/**', '*.log', '*.txt'],
                    env: {
                        PORT: '3000'
                    }
                }
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            debug: ['nodemon', 'node-inspector'],
            debugyo: ['nodemon:debugyo', 'node-inspector']
        },
        'node-inspector': {
            default: {
                options: {
                    'web-port': 8088,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');

    grunt.loadNpmTasks('grunt-node-inspector');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('debug', ['concurrent:debug']);
    grunt.registerTask('debugyo', ['concurrent:debugyo']);

    grunt.registerTask('default', ['jshint', 'jscs']);
};