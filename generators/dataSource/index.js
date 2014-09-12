'use strict';
var GeneratorBase = require('../../util/generator'),
    _ = require('lodash');

var KendoMobileSignupGenerator = new GeneratorBase({
    initializing: function () {
        this.generatorName = 'dataSource';
    },

    writing: {
        app: function () {
        },

        projectfiles: function () {
            var model = 'app/scripts/signup.js';
            this.template('model.js', model);
        }
    },

    end: function () {
    }
});

module.exports = KendoMobileSignupGenerator;
