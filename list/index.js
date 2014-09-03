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
                    type: 'input',
                    name: 'view',
                    message: 'Which view you want to add the list to?',
                    default: 'home'
                },
                {
                    type: 'input',
                    name: 'collection',
                    message: 'What is the name of the everlive collection?',
                    default: 'Activities'
                },
                {
                    type: 'input',
                    name: 'fields',
                    message: 'Which fields you want to pick?',
                    default: 'Text,Name'
                }
            ];
            this.prompt(prompts, function (props) {
                this.view = props.view;
                this.collection = props.collection;
                this.fields = props.fields.split(',');

                done();
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

                var model = 'app/scripts/' + this.view + '-list.js';
                this.template('model.js', model);

                var index = this.engine(this.dest.read('app/index.html'), this);
                index = this.appendScripts(index, '', ['scripts/' + this.view + '-list.js']);
                this.writeFileFromString(index, 'app/index.html');
            }
        },

        end: function () {
        }
    })
    ;

module.exports = KendoMobileTabGenerator;
