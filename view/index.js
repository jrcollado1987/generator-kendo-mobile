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
                name: 'name',
                message: 'Name the view?',
                default: 'home'
            }
        ];
        this.prompt(prompts, function (props) {
            this.name = props.name;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            this.template('view.html', 'app/views/' + this.name + '.html');
            this.template('model.js', 'app/scripts/' + this.name + '.js');
            this.scripts = ['scripts/' + this.name + '.js'];
        },

        projectfiles: function () {
            var index = this.engine(this.dest.read('app/index.html'), this);
            index = this.appendScripts(index, '', this.scripts);

            var linkTemplate = this.src.read('link.html');
            var link = this.engine(linkTemplate, this);
            index = this.domUpdate(index, "#navigation-container", link, 'a');

            this.writeFileFromString(index, 'app/index.html');
        }
    },

    end: function () {
    }
});

module.exports = KendoMobileTabGenerator;
