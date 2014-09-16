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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jscs');

    grunt.registerTask('default', ['jshint', 'jscs']);
};