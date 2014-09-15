module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                reporter: require('jshint-junit-reporter'),
                reporterOutput: "junit-output.xml",
                jshintrc: '.jshintrc',
                ignores: ['client/scripts/require.js']
            },
            build: [
                "generators/**/*.js",
                "lib/*.js",
                "*.js"
            ]
        },
        watch: {
            less: { files: 'client/styles/*.less', tasks: [ 'less' ] }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint']);
};