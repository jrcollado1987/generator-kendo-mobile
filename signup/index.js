'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');

var KendoMobileSignupGenerator = yeoman.generators.Base.extend({
    initializing: function () {
    },

    prompting: function () {
        var done = this.async();
        var that = this;

        var prompts = [
            {
                type: 'input',
                name: 'view',
                message: 'Which view you want to add the signup form to?',
                default: 'home'
            },
            {
                type: 'input',
                name: 'navigate',
                message: 'Which view to navigate on successful signup?',
                default: 'welcome'
            }
        ];

        that.prompt(prompts, function (props) {
            that.view = props.view;
            that.navigate = props.navigate;

            done();

        }.bind(this));
    },

    writing: {
        app: function () {
            var that = this;
        },

        projectfiles: function () {
            var viewTemplate = this.src.read('view.html');
            var viewFile = 'app/views/' + this.view + '.html';
            var view = this.engine(this.dest.read(viewFile), this);

            var list = this.engine(viewTemplate, this);

            view = this.domUpdate(view, ".view-content", list, 'a');
            this.writeFileFromString(view, viewFile);

            var model = 'app/scripts/signup.js';
            this.template('model.js', model);

            var index = this.engine(this.dest.read('app/index.html'), this);
            index = this.appendScripts(index, '', ['scripts/signup.js']);
            this.writeFileFromString(index, 'app/index.html');
        }
    },

    end: function () {
    }
});

module.exports = KendoMobileSignupGenerator;
