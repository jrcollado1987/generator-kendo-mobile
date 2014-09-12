'use strict';
var GeneratorBase = require('../../util/generator'),
    _ = require('lodash');

var KendoMobileTabGenerator = new GeneratorBase({
        initializing: function () {
            this.generatorName = 'list';
        },

        writing: {
            app: function () {
            },

            projectfiles: function () {
                var listTemplate = this.src.read('list.html');
                var viewFile = 'app/views/' + this.view + '.html';
                var view = this.engine(this.dest.read(viewFile), this);

                var list = this.engine(listTemplate, this);

                view = this.domUpdate(view, ".view-content", list, 'a');
                this.writeFileFromString(view, viewFile);

                var model = 'app/scripts/' + this.name + '.js';
                this.template('model.js', model);

                var index = this.engine(this.dest.read('app/index.html'), this);
                index = this.appendScripts(index, '', ['scripts/' + this.name + '.js']);
                this.writeFileFromString(index, 'app/index.html');
            }
        },

        end: function () {
        }
    });

module.exports = KendoMobileTabGenerator;
