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

        var prompts = [
            {
                type: 'confirm',
                name: 'header',
                message: 'Would you like a navigation header?',
                default: true
            },
            {
                type: 'input',
                name: 'tabsCount',
                message: 'How many tabs you want?',
                default: 3
            }
        ];
        this.prompt(prompts, function (props) {
            var that = this;
            that.tabsCount = props.tabsCount;

            that.tabs = [];

            var tabPrompts = [];
            for (var i = 0; i < props.tabsCount; i++) {
                var tab = 'tab' + (i + 1);
                tabPrompts.push({
                    type: 'input',
                    name: tab,
                    message: 'What is the name of' + tab + "?",
                    default: tab
                });
            }


            that.prompt(tabPrompts, function (props) {
                _.forEach(props, function (prop) {
                    that.tabs.push(prop);
                });
                done();
            }.bind(this));

            this.header = props.header;

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
            var index = this.engine(this.dest.read('app/index.html'), this);

            if (this.header) {
                var header = this.src.read('tab-header.html');
                var h = this.engine(header, this);
                index = this.domUpdate(index, "#header", h, 'r');
            }

            var tabs = this.src.read('tab-strip.html');
            var footer = this.engine(tabs, this);

            index = this.domUpdate(index, "#footer", footer, 'r');
            this.writeFileFromString(index, 'app/index.html');
        }
    },

    end: function () {
    }
});

module.exports = KendoMobileTabGenerator;
