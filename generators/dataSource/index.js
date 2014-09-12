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
        }
    },

    end: function () {
        var ds = this.config.get('dataSources');

        ds.push(this.properties);

        this.config.set('dataSources', ds);
    }
});

module.exports = KendoMobileSignupGenerator;
