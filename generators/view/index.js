'use strict';
var GeneratorBase = require('../../lib/generator'),
    _ = require('lodash');

var KendoMobileViewGenerator = GeneratorBase.extend({
    initializing: function () {
        this._init();
        this.argument('name', { type: String, required: false });
        if (this.name) {
            this.context.name = this.name;
        }
        this.generator = 'view';
    },

    prompting: function () {
        this._usePredefinedAnswersOrPrompt();
    },

    writing: {
        app: function () {
            this.template('view.html', 'app/views/' + this.context.name + '.html', this.context);
            this.template('model.js', 'app/scripts/' + this.context.name + '.js', this.context);
            this.scripts = ['scripts/' + this.context.name + '.js'];
        },

        projectfiles: function () {
            var index = this.engine(this.dest.read('app/index.html'), this.context);
            index = this.appendScripts(index, '', this.scripts);

            var linkTemplate = this.src.read('link.html');

            var link = this.engine(linkTemplate, this.context);

            if (this.config.get('navigation') == 'drawer') {
                link = '<li>' + link + '</li>';
            }

            index = this.domUpdate(index, "#navigation-container", link, 'a');

            this.writeFileFromString(index, 'app/index.html');
        }
    },

    end: function () {
        var views = this.config.get('views');
        if (views) {
            views.push(this.context);
            this.config.set('views', views);
        }
    }
});

module.exports = KendoMobileViewGenerator;
