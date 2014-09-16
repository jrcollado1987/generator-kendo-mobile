'use strict';
var GeneratorBase = require('../../lib/generator'),
    _ = require('lodash');

var KendoMobileSignupGenerator = new GeneratorBase({
    initializing: function () {
        this.generatorName = 'dataSource';
    },

    writing: {
        app: function () {
        },

        projectfiles: function () {
            if (this.type == 'everlive') {
                this.src.copy('static/everlive.all.min.js', 'app/lib/everlive.all.min.js');

                var index = this.engine(this.dest.read('app/index.html'), this);
                index = this.appendScripts(index, '', ['lib/everlive.all.min.js']);
                this.writeFileFromString(index, 'app/index.html');
            }
        }
    },

    end: function () {
        var sources = this.config.get('dataSources');
        sources.push(this.properties);
        this.config.set('dataSources', sources);
    }
});

module.exports = KendoMobileSignupGenerator;
