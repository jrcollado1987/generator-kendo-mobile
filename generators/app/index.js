'use strict';
var path = require('path'),
    GeneratorBase = require('../../util/generator'),
    _ = require('lodash');

var KendoMobileGenerator = new GeneratorBase({
    initializing: function () {
        this.pkg = require('../../package.json');
        this.argument('appname', { type: String, required: false });
        this.appname = this.appname || path.basename(process.cwd());
        this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

        this.generatorName = 'app';
        this.generatorWelcome = 'Welcome to the legendary Kendo Mobile generator!';
    },

    writing: {
        app: function () {
            this.dest.mkdir('app');

            this.src.copy('_package.json', 'package.json');

//            if (this.everlive) {
//                this.src.copy('static/everlive.all.min.js', 'app/lib/everlive.all.min.js');
//            }
            this.template('scripts/app.js', 'app/scripts/app.js');
            this.template('main.css', 'app/styles/main.css');

            this.composeWith('kendo-mobile:view', { arguments: [this.view]});
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

        this.installDependencies();
    }
});

module.exports = KendoMobileGenerator;
