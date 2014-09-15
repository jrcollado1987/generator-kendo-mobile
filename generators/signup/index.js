'use strict';
var GeneratorBase = require('../../lib/generator'),
    _ = require('lodash');

var KendoMobileSignupGenerator = new GeneratorBase({
    initializing: function () {
        this.generatorName = 'signup';
    },

    writing: {
        app: function () {
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
