'use strict';

var Base = require('yeoman-generator').generators.Base,
    _ = require('lodash'),
    yosay = require('yosay'),
    schema;

var generatorSchema = function (generator) {
    if (!schema) {
        schema = require('../.schema.json');
    }

    return schema[generator];
};

var promptType = function (prop) {
    var prompt = {
        type: 'input'
    };

    if (prop.enum) {
        prompt.type = 'list';
        prompt.choices = prop.enum;
    }
    else if (prop.type == 'bool') {

    }

    return prompt;
};

var properties = function (generator) {
    var genSchema = generatorSchema(generator);

    return _.chain(genSchema['properties'])
        .filter(function (prop) {
            return !prop['no-prompt'];
        })
        .map(function (prop) {
            return prop.name;
        }).value();
};

var getPrompts = function (generator) {
    var genSchema = generatorSchema(generator);

    return _.chain(genSchema['properties'])
        .filter(function (prop) {
            return !prop['no-prompt'];
        })
        .map(function (prop) {
            var prompt = {
                name: prop.name,
                message: prop.description,
                default: prop.default
            };

            prompt = _.extend(prompt, promptType(prop));

            return prompt;
        }).value();
};


function GeneratorBase(protoProps) {
    if (!this instanceof GeneratorBase) {
        return new GeneratorBase(protoProps);
    }

    _.mixin(protoProps || {}, {
        _prompting: function () {
            var that = this,
                done = that.async(),
                prompts = getPrompts(that.generatorName);

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