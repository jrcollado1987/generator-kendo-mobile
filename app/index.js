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
                type: 'list',
                name: 'navigation',
                message: 'Which navigation type you choose?',
                choices: ['tabstrip', 'drawer', 'custom'],
                default: 'tabstrip'
            },
            {
                type: 'input',
                name: 'view',
                message: 'Which will be your initial view?',
                default: 'home'
            },
            {
                type: 'list',
                name: 'theme',
                message: 'Which theme you prefer?',
                choices: ['default', 'flat', 'bootstrap'],
                default: 'flat'
            },
            {
                type: 'list',
                name: 'transition',
                message: 'Which transition type you prefer?',
                choices: ['slide', 'zoom', 'fade'],
                default: 'slide'
            },
            {
                type: 'confirm',
                name: 'everlive',
                message: 'Do you want to use everlive backend service?',
                default: true
            }
        ];

        this.prompt(prompts, function (props) {
            var that = this;
            that.everlive = props.everlive;
            that.navigation = props.navigation;
            that.view = props.view;
            that.theme = props.theme;
            that.transition = props.transition;
            if (that.everlive) {
                that.prompt([
                    {
                        type: 'input',
                        name: 'everliveKey',
                        message: 'What is your Everlive API key?',
                        default: 'h8KnncMXaRhvMXmp'
                    }
                ], function (props) {
                    that.everliveKey = props.everliveKey;
                    done();
                });
            }
            else {
                done();
            }

            this.config.set('navigation', this.navigation);

        }.bind(this));
    },

    writing: {
        app: function () {
            this.dest.mkdir('app');

            this.src.copy('_package.json', 'package.json');

            if (this.everlive) {
                this.src.copy('static/everlive.all.min.js', 'app/lib/everlive.all.min.js');
            }
            this.template('scripts/app.js', 'app/scripts/app.js');
            this.template('main.css', 'app/styles/main.css');
        },

        projectfiles: function () {
            this.src.copy('editorconfig', '.editorconfig');
            this.src.copy('jshintrc', '.jshintrc');
            this.template('_gruntfile.js', 'Gruntfile.js');

            this.directory('static/kendo', 'app/kendo');

            this.directory('static/cordova', 'app');

            //this.template('index.html', 'app/index.html');
            var index = this.engine(this.src.read('index.html'), this);

            var navigationTemplateSource = 'navigations/' + this.navigation + '.html';

            var navigationTemplate = this.src.read(navigationTemplateSource);
            var navigation = this.engine(navigationTemplate, this);
            index = this.domUpdate(index, "body", navigation, 'r');

            this.writeFileFromString(index, 'app/index.html');
        }
    },

    end: function () {
        this.installDependencies();
    }
});

module.exports = KendoMobileGenerator;
