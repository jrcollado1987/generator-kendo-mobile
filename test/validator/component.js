/* global describe, it */

'use strict';

var assert = require('../assert.js');
var ValidationError = require('../../lib/validator.js').ValidationError;
var ComponentValidator = require('../../lib/validator.js').ComponentValidator;

describe('ComponentValidator', function () {
  it('throws if no schema provided in constructor', function () {
    assert.throws(function () {
      var validator = new ComponentValidator();
    }, Error);

    assert.throwsNot(function () {
      var validator = new ComponentValidator();
    }, ValidationError);
  });

  it('validates component', function () {
    var schema = {
      name: 'Dummy component',
      type: 'object',
      properties: [
        {
          name: 'id',
          type: 'integer',
          required: true
        },
        {
          name: 'name',
          type: 'string',
          required: true
        }
      ]
    };

    var validator = new ComponentValidator(schema);

    assert.throws(function () {
      validator.validate(null);
    }, ValidationError, 'throws on null');

    assert.throws(function () {
      validator.validate(undefined);
    }, ValidationError, 'throws on undefined');

    assert.throws(function () {
      validator.validate(123);
    }, ValidationError, 'throws on value type');

    assert.throws(function () {
      validator.validate({});
    }, ValidationError, 'throws on empty object');

    assert.throws(function () {
      validator.validate({ id: 123 });
    }, ValidationError, 'throws on invalid object (missing required property)');

    assert.throws(function () {
      validator.validate({ name: 'myComponent' });
    }, ValidationError, 'throws on invalid object (missing required property)');

    assert.throws(function () {
      validator.validate({ id: "123" });
    }, ValidationError, 'throws on invalid object (invalid property)');

    assert.doesNotThrow(function () {
      validator.validate({ id: 123, name: 'myDummyComponent'});
    });
  });

  it('aggregates multiple validation errors', function () {
    var schema = {
      name: 'Dummy component',
      type: 'object',
      properties: [
        {
          name: 'id',
          type: 'integer',
          required: true
        },
        {
          name: 'name',
          type: 'string',
          required: true
        }
      ]
    };

    var validator = new ComponentValidator(schema);

    assert.throws(function () {
      validator.validate({});
    }, function (err) {
      var isValidationError = err instanceof ValidationError;
      var containsInnerErrors = err.errors instanceof Array && err.errors.length === 2;
      var innerError1isOK = err.errors[0] instanceof ValidationError;
      var innerError2isOK = err.errors[1] instanceof ValidationError;

      return isValidationError && containsInnerErrors && innerError1isOK && innerError2isOK;
    });
  });
});
