/* global describe, it */

'use strict';

var assert = require('../assert.js');
var ValidationError = require('../../lib/validator.js').ValidationError;
var PropertyValidator = require('../../lib/validator.js').PropertyValidator;

describe('PropertyValidator', function () {
  it('throws if no schema provided in constructor', function () {
    assert.throws(function () {
      var validator = new PropertyValidator();
    }, Error);

    assert.throwsNot(function () {
      var validator = new PropertyValidator();
    }, ValidationError);
  });

  it('validates string', function () {
    var validator = new PropertyValidator({
      type: 'string'
    });

    assert.doesNotThrow(function () {
      validator.validate('abc');
    });

    assert.doesNotThrow(function () {
      validator.validate('123');
    });

    assert.doesNotThrow(function () {
      validator.validate(undefined);
    });

    assert.throws(function () {
      validator.validate(123);
    }, ValidationError);
  });
});
