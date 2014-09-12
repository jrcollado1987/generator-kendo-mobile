/* global describe, it */

'use strict';

var assert = require('yeoman-generator').assert;
var lib = require('../lib');
var Validator = lib.Validator;
var schema = require('../.schema.json');

describe('validator', function () {
  it('validator constructor exists', function () {
    assert.equal(Validator instanceof Function, true);
  });

  it('generator schema exists', function () {
    assert.equal(schema instanceof Object, true);
  });

  it('validator is initialized with schema', function () {
    assert.strictEqual(new Validator(schema).schema, schema);
  });

  describe('#validateApp()', function() {
    it('method exists', function () {
      assert.equal(typeof new Validator().validateApp, 'function');
    });
  });

  describe('#validateComponent()', function () {
    it('method exists', function () {
      assert.equal(typeof new Validator().validateComponent, 'function');
    });
  });
});
