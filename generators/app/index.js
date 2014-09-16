'use strict';
var path = require('path'),
    GeneratorBase = require('../../lib/generator'),
    _ = require('lodash');

var KendoMobileGenerator = new GeneratorBase({
    initializing: function () {
        this.pkg = require('../../package.json');
        this.appname = this.appname || path.basename(process.cwd());
        this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

        this.generatorName = 'app';
        this.generatorWelcome = 'Welcome to the legendary Kendo Mobile generator!';
        // noCli is passed to prevent some operations for non-cli environment.
    },

    writing: {
        app: function () {
            this.dest.mkdir('app');

            this.src.copy('_package.json', 'package.json');

            this.template('app.js', 'app/scripts/app.js');
            this.template('main.css', 'app/styles/main.css');

            if (!this.noCli) {
                this.composeWith('kendo-mobile:view', { arguments: [this.view]});
            }
        },

        projectfiles: function () {
            this.src.copy('editorconfig', '.editorconfig');
            this.src.copy('jshintrc', '.jshintrc');
            this.template('_gruntfile.js', 'Gruntfile.js');

            this.directory('static/kendo', 'app/kendo');

            this.directory('static/cordova', 'app');

            //this.template('index.html', 'app/index.html');
            var index = this.engine(this.src.read('index.html'), this);

            var navigationTemplateSource = 'navigations/' + this.navigation + '.html';

            var navigationTemplate = this.src.read(navigationTemplateSource);
            var navigation = this.engine(navigationTemplate, this);
            index = this.domUpdate(index, "body", navigation, 'r');

            this.writeFileFromString(index, 'app/index.html');
        }
    },

    end: function () {
        this.config.set('navigation', this.navigation);

        this.config.set('names', []);
        this.config.set('dataSources', []);
        this.config.set('views', []);

        if (!this.noCli) {
            this.installDependencies();
        }
    }
});

module.exports = KendoMobileGenerator;
