'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var KendoMobileTabGenerator = yeoman.generators.Base.extend({
    initializing: function () {
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the legendary KendoMobile generator!'
        ));

        var prompts = [
            {
                type: 'confirm',
                name: 'header',
                message: 'Would you like a navigation header?',
                default: true
            },
            {
                type: 'input',
                name: 'tabs',
                message: 'List the main navigation tabs.',
                default: ['Home', 'Settings', 'Contacts']
            }
        ];
        this.prompt(prompts, function (props) {
            this.tabs = props.tabs;
            this.header = props.header;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            this.directory('scripts', 'app/scripts');
            this.directory('views', 'app/views');
        },

        projectfiles: function () {
            this.template('index.html', 'app/index.html');
        }
    },

    end: function () {
    }
});

module.exports = KendoMobileTabGenerator;
