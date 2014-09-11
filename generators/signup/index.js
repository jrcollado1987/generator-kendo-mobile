'use strict';
var yeoman = require('yeoman-generator'),
    schema = require('../../schema/generators'),
    _ = require('lodash');

var KendoMobileSignupGenerator = yeoman.generators.Base.extend({
    initializing: function () {
    },

    prompting: function () {
        var that = this,
            done = that.async(),
            prompts = schema.prompts('signup');

        that.prompt(prompts, function (props) {
            _.extend(that, props);

            done();

        }.bind(that));
    },

    writing: {
        app: function () {
            var that = this;
        },

        projectfiles: function () {
            var viewTemplate = this.src.read('view.html');

            var viewFile = 'app/views/' + this.view + '.html';
            var view = this.engine(this.dest.read(viewFile), this);
            var content = this.engine(viewTemplate, this);

            view = this.domUpdate(view, ".view-content", content, 'r');

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
