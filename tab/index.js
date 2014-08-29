'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');

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
                default: 'Home,Settings,Contacts'
            }
        ];
        this.prompt(prompts, function (props) {
            this.tabs = props.tabs.split(',');
            this.header = props.header;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            var that = this;

            that.template('scripts/app.js', 'app/scripts/app.js');

            _.each(that.tabs, function (tab) {
                var name = 'app/views/' + tab + '.html';
                that.template('views/tab-view.html', name, {
                    name: tab
                });
            });
        },

        projectfiles: function () {
            this.template('index.html', 'app/index.html');
        }
    },

    end: function () {
    }
});

module.exports = KendoMobileTabGenerator;
