'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var KendoMobileGenerator = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
        this.argument('appname', { type: String, required: false });
        this.appname = this.appname || path.basename(process.cwd());
        this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the legendary Kendo Mobile generator!'
        ));

        var prompts = [
            {
                type: 'confirm',
                name: 'everlive',
                message: 'Do you want to use everlive backend service?',
                default: true
            }
        ];

        this.prompt(prompts, function (props) {
            this.everlive = props.everlive;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            this.dest.mkdir('app');

            this.src.copy('_package.json', 'package.json');
            this.src.copy('_bower.json', 'bower.json');

            if(this.everlive) {
                this.src.copy('../static/everlive.all.min.js', 'app/lib/everlive.all.min.js');
            }
            this.template('scripts/app.js', 'app/scripts/app.js');
        },

        projectfiles: function () {
            this.src.copy('editorconfig', '.editorconfig');
            this.src.copy('jshintrc', '.jshintrc');

            this.directory('../static/kendo', 'app/kendo');
            this.directory('styles', 'app/styles');
            this.directory('../static/cordova', 'app');

            this.template('index.html', 'app/index.html');

            this.template('_gruntfile.js', 'Gruntfile.js');
        }
    },

    end: function () {
        this.installDependencies();
    }
});

module.exports = KendoMobileGenerator;
