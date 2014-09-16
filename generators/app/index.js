'use strict';
var path = require('path'),
    GeneratorBase = require('../../lib/generator'),
    _ = require('lodash');

var KendoMobileGenerator = new GeneratorBase({
    _options: {
        name: 'app',
        welcome: 'Welcome to the legendary Kendo Mobile generator!'
    },
    initializing: function () {
        this._init();
        this.context.pkg = require('../../package.json');
        this.context.appname = this.appname || path.basename(process.cwd());
        this.context.appname = this._.camelize(this._.slugify(this._.humanize(this.context.appname)));
        // noCli is passed to prevent some operations for non-cli environment.
    },

    writing: {
        app: function () {
            this.dest.mkdir('app');

            this.src.copy('_package.json', 'package.json');

            this.template('app.js', 'app/scripts/app.js', this.context);
            this.template('main.css', 'app/styles/main.css', this.context);

            if (!this.noCli) {
                this.composeWith('kendo-mobile:view', { arguments: [this.context.view]});
            }
        },

        projectfiles: function () {
            this.src.copy('editorconfig', '.editorconfig');
            this.src.copy('jshintrc', '.jshintrc');
            this.template('_gruntfile.js', 'Gruntfile.js', this.context);

            this.directory('static/kendo', 'app/kendo');

            this.directory('static/cordova', 'app');

            var index = this.engine(this.src.read('index.html'), this.context);

            var navigationTemplateSource = 'navigations/' + this.context.navigation + '.html';

            var navigationTemplate = this.src.read(navigationTemplateSource);
            var navigation = this.engine(navigationTemplate, this.context);
            index = this.domUpdate(index, "body", navigation, 'r');

            this.writeFileFromString(index, 'app/index.html');
        }
    },

    end: function () {
        this.config.set('navigation', this.context.navigation);

        this.config.set('names', []);
        this.config.set('dataSources', []);
        this.config.set('views', []);

        if (!this.noCli) {
            this.installDependencies();
        }
    }
});

module.exports = KendoMobileGenerator;
