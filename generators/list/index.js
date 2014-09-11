'use strict';
var util = require('util');
var path = require('path');
Generator = require('../../util/generator'),
var yosay = require('yosay');
var _ = require('lodash');

var KendoMobileTabGenerator = new Generator({
        initializing: function () {
        },

        _prompting: function () {
            var done = this.async();
            var that = this;

            var prompts = [
                {
                    type: 'input',
                    name: 'view',
                    message: 'Which view you want to add the list to?',
                    default: 'home'
                },
                {
                    type: 'input',
                    name: 'name',
                    message: 'Provide a name (id) for the list widget.',
                    default: 'homeList'
                },
                {
                    type: 'list',
                    name: 'type',
                    message: 'Choose data source type?',
                    choices: ['everlive', 'odata', 'rest'],
                    default: 'everlive'
                }
            ];

            var furtherPrompts = [
                {
                    type: 'input',
                    name: 'collection',
                    message: 'What is the name of the data collection?',
                    default: 'Products'
                },
                {
                    type: 'input',
                    name: 'fields',
                    message: 'Which fields you want to pick?',
                    default: 'Text,Name'
                }
            ];

            var finish = function () {
                that.prompt(furtherPrompts, function (props) {
                    that.collection = props.collection;
                    that.fields = props.fields.split(',');

                    done();
                });
            };

            that.prompt(prompts, function (props) {
                that.view = props.view;
                that.name = props.name;
                that.type = props.type;
                if (this.type != 'everlive') {
                    that.prompt([
                        {
                            type: 'input',
                            name: 'url',
                            message: 'What is the service base url?',
                            default: 'http://demos.telerik.com/kendo-ui/service/Northwind.svc'
                        }
                    ], function (props) {
                        that.url = props.url;
                        finish();
                    });
                }
                else {
                    finish();
                }

            }.bind(this));
        },

        writing: {
            app: function () {
                var that = this;
            },

            projectfiles: function () {
                var listTemplate = this.src.read('list.html');
                var viewFile = 'app/views/' + this.view + '.html';
                var view = this.engine(this.dest.read(viewFile), this);

                var list = this.engine(listTemplate, this);

                view = this.domUpdate(view, ".view-content", list, 'a');
                this.writeFileFromString(view, viewFile);

                var model = 'app/scripts/' + this.name + '.js';
                this.template('model.js', model);

                var index = this.engine(this.dest.read('app/index.html'), this);
                index = this.appendScripts(index, '', ['scripts/' + this.name + '.js']);
                this.writeFileFromString(index, 'app/index.html');
            }
        },

        end: function () {
        }
    })
    ;

module.exports = KendoMobileTabGenerator;
