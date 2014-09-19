/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('kendo-mobile:app', function () {
    describe ('with default settings', function(){
        before(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .inDir(path.join(os.tmpdir(), './temp-generated-app'))
                .withOptions({})
                .withGenerators([path.join(__dirname, '../generators/view')])
                .withPrompts({
                    //view: 'default',
                    //noCli: true
                })
                .on('end', done);
        });
        it('creates files', function () {
            assert.file([
                'package.json',
                '.editorconfig',
                '.jshintrc',
                'Gruntfile.js',
                'app/scripts/app.js',
                'app/styles/main.css',
                'app/kendo/js/jquery.min.js',
                'app/kendo/js/kendo.mobile.min.js',
                'app/index.html'
            ]);
        });

        it('creates default view', function () {
            assert.file([
                'app/views/home.html',
                'app/scripts/home.js'
            ]);
        });

        it('add default view in app file', function () {
            assert.fileContent('app/scripts/app.js', new RegExp('initial: \'views/home.html\''));
        });

        it('add href for the home view in index file', function () {
            assert.fileContent('app/index.html', new RegExp('<a href=\"views/home.html\" data-icon=\"home\">home</a>'));
        });

        it('add tabstrip navigation in index file', function () {
            assert.fileContent('app/index.html', new RegExp('div data-role=\"tabstrip\" id=\"navigation-container\"'));
        });

        it('add theme in app file', function () {
            assert.fileContent('app/scripts/app.js', new RegExp('skin: \'flat\''));
        });

        it('add transition in app file', function () {
            assert.fileContent('app/scripts/app.js', new RegExp('transition: \'slide\''));
        });
    });

    describe('kendo-mobile:app with drawer navigation', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .inDir(path.join(os.tmpdir(), './temp-test'))
                .withOptions({})
                .withGenerators([path.join(__dirname, '../generators/view')])
                .withPrompts({
                    navigation: 'drawer'
                })
                .on('end', done);
        });

        it('add drawer navigation in index file', function () {
            assert.fileContent('app/index.html', new RegExp('<a data-role=\"button\" href=\"#appDrawer\" data-rel=\"drawer\" data-align=\"left\" data-icon=\"drawer-button\"></a>'));
        });
    });
});