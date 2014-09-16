'use strict';

function type(value) {
  return Object.prototype.toString.call(value);
}

function isObject(value) {
  return type(value) === '[object Object]';
}

function isArray(value) {
  return type(value) === '[object Array]';
}

function isDate(value) {
  return type(value) === '[object Date]';
}

function isNumber(value) {
  return type(value) === '[object Number]';
}

function isString(value) {
  return type(value) === '[object String]';
}

function isBoolean(value) {
  return type(value) === '[object Boolean]';
}

function isNull(value) {
  return type(value) === '[object Null]';
}

function isUndefined(value) {
  return type(value) === '[object Undefined]';
}

function isNullOrUndefined(value) {
  return isNull(value) || isUndefined(value);
}

exports.type = type;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isDate = isDate;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isBoolean = isBoolean;
exports.isNull = isNull;
exports.isUndefined = isUndefined;
exports.isNullOrUndefined = isNullOrUndefined;
