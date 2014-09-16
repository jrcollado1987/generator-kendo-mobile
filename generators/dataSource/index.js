'use strict';
var GeneratorBase = require('../../lib/generator'),
    _ = require('lodash');

var KendoMobileDataSourceGenerator = new GeneratorBase({
    _options: {
        name: 'dataSource'
    },
    initializing: function () {
        this._init();
    },
    writing: {
        projectfiles: function () {
            var that = this;

            if (that.context.type == 'everlive') {
                that.src.copy('static/everlive.all.min.js', 'app/lib/everlive.all.min.js');

                var index = that.engine(that.dest.read('app/index.html'), that.context);
                index = that.appendScripts(index, '', ['lib/everlive.all.min.js']);
                that.writeFileFromString(index, 'app/index.html');
            }
        }
    },

    end: function () {
        var sources = this.config.get('dataSources');
        sources.push(this.context);
        this.config.set('dataSources', sources);
    }
});

module.exports = KendoMobileDataSourceGenerator;
