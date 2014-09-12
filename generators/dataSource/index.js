'use strict';
var SchemaGenerator = require('../../schema/schemaGenerator'),
    _ = require('lodash');

var KendoMobileSignupGenerator = SchemaGenerator.extend({
    initializing: function () {
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
