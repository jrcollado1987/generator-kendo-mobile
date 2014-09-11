'use strict';
var Generator = require('../../util/generator'),
    schema = require('../../schema/generators'),
    _ = require('lodash');

var KendoMobileViewGenerator = new Generator({
    initializing: function () {
        this.argument('name', { type: String, required: false });
    },

    _prompting: function () {
        var that = this;

        if (!that.name) {
            var done = this.async();
            var prompts = schema.prompts('view');

            that.prompt(prompts, function (props) {
                _.extend(that, props);

                done();
            }.bind(that));
        }
    },

    writing: {
        app: function () {
            this.template('view.html', 'app/views/' + this.name + '.html');
            this.template('model.js', 'app/scripts/' + this.name + '.js');
            this.scripts = ['scripts/' + this.name + '.js'];
        },

        projectfiles: function () {
            var index = this.engine(this.dest.read('app/index.html'), this);
            index = this.appendScripts(index, '', this.scripts);

            var linkTemplate = this.src.read('link.html');

            var link = this.engine(linkTemplate, this);

            if (this.config.get('navigation') == 'drawer') {
                link = '<li>' + link + '</li>';
            }

            index = this.domUpdate(index, "#navigation-container", link, 'a');

            this.writeFileFromString(index, 'app/index.html');
        }
    },

    end: function () {
    }
});

module.exports = KendoMobileViewGenerator;
