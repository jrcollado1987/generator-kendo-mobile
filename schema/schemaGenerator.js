'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');

var SchemaGenerator = yeoman.generators.Base.extend({
    initializing: function () {

    },

    prompting: function () {
        var that = this,
            done = that.async(),
            prompts = schema.prompts(that.name);

        that.prompt(prompts, function (props) {
            _.extend(that, props);

            done();

        }.bind(that));
    }
});

module.export = SchemaGenerator