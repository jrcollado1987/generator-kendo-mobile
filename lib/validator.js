'use strict';

var jsonGate = require('json-gate');
var util = require('util');
var libUtil = require('./util.js');

var messages = {
  optionsMissing: 'Missing or invalid options object.',
  optionsInvalid: 'Invalid component options.',
  schemaMissing: 'Missing or invalid schema object.',
  propertyInvalid: '\'%s\': %s.'
};

function ValidationError() {
  Error.apply(this, arguments);
}

util.inherits(ValidationError, Error);

function PropertyValidator(schema) {
  if (!libUtil.isObject(schema)) {
    throw new Error(messages.schemaMissing);
  }

  this.schema = schema;
  this.compiledSchema = jsonGate.createSchema(schema);
}

PropertyValidator.prototype.validate = function (value) {
  try {
    this.compiledSchema.validate(value);
  }
  catch (e) {
    var msg = util.format(messages.propertyInvalid, this.schema.name, e.message);

    throw new ValidationError(msg);
  }
};

function ComponentValidator(schema) {
  if (!libUtil.isObject(schema)) {
    throw new Error(messages.schemaMissing);
  }

  this.schema = schema;
}

ComponentValidator.prototype.validate = function (options) {
  if (!libUtil.isObject(options)) {
    throw new ValidationError(messages.optionsMissing);
  }

  var properties = this.schema.properties;
  var errors = [];

  if (libUtil.isArray(properties)) {
    for (var i = 0; i < properties.length; i++) {
      var propertySchema = properties[i];

      try {
        var propertyValidator = new PropertyValidator(propertySchema);
        propertyValidator.validate(options[propertySchema.name]);
      }
      catch (e) {
        errors.push(e);
      }
    }
  }

  if (errors.length) {
    var error = new ValidationError(messages.optionsInvalid);
    error.errors = errors;

    throw error;
  }
};

exports.ValidationError = ValidationError;
exports.PropertyValidator = PropertyValidator;
exports.ComponentValidator = ComponentValidator;
