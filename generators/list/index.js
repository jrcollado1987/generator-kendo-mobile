'use strict';
var GeneratorBase = require('../../lib/generator'),
    _ = require('lodash');

var KendoMobileListGenerator = GeneratorBase.extend({
    initializing: function () {
        this._init();
        this.generator = 'list';
    },

    prompting: function () {
        this._usePredefinedAnswersOrPrompt();
    },

    writing: {
        projectfiles: function () {
            var that = this,
                sources = that.config.get('dataSources');

            var ds = _.find(sources, function (ds) {
                return ds.name == that.context.dataSource;
            });

            //TODO: Think of way to deal with arrays.
            //TODO: Resolve array types in more generic way.
            if (!_.isArray(that.context.fields)) {
                that.context.fields = that.context.fields.split(',');
            }

            _.extend(that.context, ds);

            var listTemplate = that.src.read('list.html');
            var viewFile = 'app/views/' + that.context.view + '.html';
            var view = that.engine(that.dest.read(viewFile), that.context);

            var list = that.engine(listTemplate, that.context);

            view = that.domUpdate(view, ".view-content", list, 'a');
            that.writeFileFromString(view, viewFile);

            var model = 'app/scripts/' + that.context.name + '.js';
            that.template('model.js', model, that.context);

            var index = that.engine(that.dest.read('app/index.html'), that.context);
            index = that.appendScripts(index, '', ['scripts/' + that.context.name + '.js']);
            that.writeFileFromString(index, 'app/index.html');
        }
    },

    end: function () {
    }
});

module.exports = KendoMobileListGenerator;
