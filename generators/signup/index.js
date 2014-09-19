'use strict';
var GeneratorBase = require('../../lib/generator'),
    _ = require('lodash');

var KendoMobileSignupGenerator = GeneratorBase.extend({
    initializing: function () {
        this._init();
        this.generator = 'view';
    },
    writing: {
        app: function () {
        },

        projectfiles: function () {
            var that = this;

            var viewTemplate = that.src.read('view.html');

            var viewFile = 'app/views/' + that.context.view + '.html';
            var view = that.engine(that.dest.read(viewFile), that.context);
            var content = that.engine(viewTemplate, that.context);

            view = that.domUpdate(view, ".view-content", content, 'r');

            that.writeFileFromString(view, viewFile);

            var model = 'app/scripts/signup.js';
            that.template('model.js', model, that.context);

            var index = that.engine(that.dest.read('app/index.html'), that.context);
            index = that.appendScripts(index, '', ['scripts/signup.js']);
            that.writeFileFromString(index, 'app/index.html');
        }
    },

    end: function () {
    }
});

module.exports = KendoMobileSignupGenerator;
