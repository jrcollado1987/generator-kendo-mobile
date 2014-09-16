/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('kendo-mobile:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(os.tmpdir(), './temp-test'))
            .withOptions({})
            .withGenerators([path.join(__dirname, '../generators/view')])
            .withPrompts({
                //view: 'default'
            })
            .on('end', done);
            console.log(path.join(__dirname, '../generators/view'));
    });

    it('creates files', function () {
        assert.file([
            'package.json',
            '.editorconfig',
            '.jshintrc'
        ]);
    });

    it('creates default view', function () {
        assert.file([
            'app/views/home.html',
            'app/scripts/home.js'
        ]);
        assert.fileContent('app/index.html', /<a href=\"views\/home\.html\" data-icon=\"home\">home<\/a><\/div>/);
    });

    it('creates tabstrip navigation', function () {
        assert.fileContent('app/index.html', /div data-role=\"tabstrip\" id=\"navigation-container\"/);
    });
});
