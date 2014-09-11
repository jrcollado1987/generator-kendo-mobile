'use strict';
var _ = require('lodash'),
    schema;

var generatorSchema = function (generator) {
    if (!schema) {
        schema = require('./../.schema.json');
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

module.exports = {
    properties: function (generator) {
        var genSchema = generatorSchema(generator);

        return _.chain(genSchema['properties'])
            .filter(function (prop) {
                return !prop['no-prompt'];
            })
            .map(function (prop) {
                return prop.name;
            }).value();
    },
    prompts: function (generator) {
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

                var prompt = _.extend(prompt, promptType(prop));

                return prompt;
            }).value();
    }
};