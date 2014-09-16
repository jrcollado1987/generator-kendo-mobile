'use strict';

var Base = require('yeoman-generator').generators.Base,
    _ = require('lodash'),
    yosay = require('yosay'),
    NAME = 'name',
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

function GeneratorBase(protoProps) {
    if (!this instanceof GeneratorBase) {
        return new GeneratorBase(protoProps);
    }

    _.mixin(protoProps || {}, {
        _init: function() {
            this.context = {};
            this._options = protoProps._options;
        },
        _set: function (props) {
            _.extend(this.context, props);
        },
        _prompts: function (criteria) {
            var that = this,
                genSchema = generatorSchema(that._options.name);

            var names = that.config.get('names');

            return _.chain(genSchema['properties'])
                .filter(criteria)
                .map(function (prop) {
                    var prompt = {
                        name: prop.name,
                        message: prop.description,
                        default: prop.default
                    };

                    prompt = _.extend(prompt, promptType(prop));

                    if (prop.name == NAME) {
                        // Validates all unique names accross the app - dataSources, Views and modules.
                        prompt.validate = function (name) {
                            if (_.contains(names, name)) {
                                return 'There is already object with this name! Names must be unique.';
                            }
                            else {
                                names.push(name);
                                that.config.set('names', names);
                                return true;
                            }
                        }
                    }

                    return prompt;
                }).value();
        },

        _prompting: function () {
            var that = this,
                done = that.async(),
                prompts,
                deps = dependencies(that._options.name);

            if (that._options.welcome) {
                that.log(yosay(that._options.welcome));
            }

            prompts = that._prompts(function (prop) {
                return !prop['no-prompt'] && prop['required'];
            });

            //if we have already set up the answers - do not prompt!
            if (_.every(prompts, function _promptExists(pr) {
                return that.context && that.context.hasOwnProperty(pr.name);
            })) {
                done();
                return;
            }

            that.prompt(prompts, function (props) {
                that._set(props);

                if (deps) {
                    _.forOwn(props, function (value, key) {
                        var dep = _.find(deps, function (dep) {
                            return dep.name == key && dep.value == value;
                        });

                        if (dep) {
                            prompts = that._prompts(function (prop) {
                                return !prop['no-prompt'] && _.contains(dep.required, prop.name);
                            });

                            that.prompt(prompts, function (values) {
                                that._set(values);
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
                that._set(answers);

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