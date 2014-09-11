'use strict';
var schema;

module.exports = {
    generator: function (generator) {
        if(!schema) {
            schema = require('./.schema.json');

        }

        return schema[generator];
    },

    promptType: function (prop) {
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
    }
};