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
                name: 'baseView',
                message: 'Which view you want to add the list to?',
                default: 'tab1'
            }
        ];
        this.prompt(prompts, function (props) {
            this.baseView = props.baseView;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            var that = this;
        },

        projectfiles: function () {
            var listTemplate = this.src.read('list.html');
            var viewFile = 'app/views/' + this.baseView + '.html';
            var view = this.engine(this.dest.read(viewFile), this);

            var list = this.engine(listTemplate, this);

            view = this.domUpdate(view, ".view-content", list, 'a');
            this.writeFileFromString(view, viewFile);
        }
    },

    end: function () {
    }
});

module.exports = KendoMobileTabGenerator;
