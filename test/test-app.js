/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('kendo-mobile:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../app'))
            .inDir(path.join(os.tmpdir(), './temp-test'))
            .withOptions({})
            .withGenerators([path.join(__dirname, '../view')])
            .withPrompts({
                view: 'default'
            })
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'package.json',
            '.editorconfig',
            '.jshintrc'
        ]);
    });

    it('creates the initial view', function () {
        assert.file([
            'app/views/default.html',
            'app/scripts/default.js'
        ]);
    });
});
