'use strict';

var assert = module.exports = require('yeoman-generator').assert;

assert.throwsNot = function (func, type, message) {
  assert.throws(func, function (err) {
    if (type instanceof Function) {
      return !(err instanceof type);
    }
    else if (type instanceof RegExp) {
      return !type.test(err);
    }

    return false;
  }, message);
};
