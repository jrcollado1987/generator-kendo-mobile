'use strict';

var Base = require('yeoman-generator').generators.Base,
    _ = require('lodash'),
    yosay = require('yosay'),
    schema = require('../schema/generators');

function GeneratorBase(protoProps) {
    if (!this instanceof GeneratorBase) {
        return new GeneratorBase(protoProps);
    }

    _.mixin(protoProps || {}, {
        _prompting: function () {
            var that = this,
                done = that.async(),
                prompts = schema.prompts(that.generatorName);

            if (that.generatorWelcome) {
                that.log(yosay(that.generatorWelcome));
            }

            that.prompt(prompts, function (props) {
                _.extend(that, props);

                done();

            }.bind(that));
        },
        prompting: function _usePredefinedAnswersOrPrompt() {
            var that = this,
                done = that.async(),
                answers = this.options.answers,
                next;
            //use predefined answers
            if (answers) {
                answers = Array.isArray(answers) ? answers.shift() : answers;
                _.assign(that, answers);

                done();
            } else { //or prompt
                next = _.isFunction(that._prompting) ? that._prompting.bind(that) : done;
                next();
            }
        }
    });

    return Base.extend(protoProps);
}

module.exports = GeneratorBase;