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

var dependencies = function (generator) {
    var genSchema = generatorSchema(generator);

    return genSchema['dependencies']
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

var getPrompts = function (generator, criteria) {
    var genSchema = generatorSchema(generator);

    return _.chain(genSchema['properties'])
        .filter(criteria)
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

var setProps = function (that, props) {
    _.extend(that, props);
    // TODO: Maybe leave only the properties.
    that.properties = that.properties || {};
    _.extend(that.properties, props);
};

function GeneratorBase(protoProps) {
    if (!this instanceof GeneratorBase) {
        return new GeneratorBase(protoProps);
    }

    _.mixin(protoProps || {}, {
        _prompting: function () {
            var that = this,
                done = that.async(),
                gen = that.generatorName,
                prompts,
                deps = dependencies(gen);

            if (that.generatorWelcome) {
                that.log(yosay(that.generatorWelcome));
            }

            prompts = getPrompts(gen, function (prop) {
                return !prop['no-prompt'] && prop['required'];
            });

            //if we have already set up the answers - do not prompt!
            if (_.every(prompts, function _promptExists(pr) {
                return that.hasOwnProperty(pr.name);
            })) {
                done();
                return;
            }

            that.prompt(prompts, function (props) {
                setProps(that, props);

                if (deps) {
                    _.forOwn(props, function (value, key) {
                        var dep = _.find(deps, function (dep) {
                            return dep.name == key && dep.value == value;
                        });

                        if (dep) {
                            prompts = getPrompts(gen, function (prop) {
                                return !prop['no-prompt'] && _.contains(dep.required, prop.name);
                            });

                            that.prompt(prompts, function (values) {
                                setProps(that, values);
                                done();
                            });
                        }
                    });
                }
                else {
                    done();
                }

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