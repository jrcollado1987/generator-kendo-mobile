/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs-extra');

var tempDir = path.join(os.tmpdir(), './temp-generated-app');

describe('kendo-mobile:app', function () {
    describe ('with default settings', function(){
        before(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .inDir(tempDir)
                .withOptions({})
                .withGenerators([path.join(__dirname, '../generators/view')])
                .withPrompts({
                    noNpm: true
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
                .inDir(tempDir)
                .withOptions({})
                .withGenerators([path.join(__dirname, '../generators/view')])
                .withPrompts({
                    noNpm: true,
                    navigation: 'drawer'
                })
                .on('end', done);
        });

        it('add drawer navigation in index file', function () {
            assert.fileContent('app/index.html', new RegExp('<a data-role=\"button\" href=\"#appDrawer\" data-rel=\"drawer\" data-align=\"left\" data-icon=\"drawer-button\"></a>'));
            assert.fileContent('app/index.html', new RegExp('<div data-role=\"drawer\" id=\"appDrawer\" data-title=\"Navigation\">'));
            assert.fileContent('app/index.html', new RegExp('<div data-role=\"drawer\" id=\"appDrawer\" data-title=\"Navigation\">'));
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

        it('do not add transition in app file', function () {
            assert.noFileContent('app/scripts/app.js', new RegExp('transition:'));
        });
    });

    describe('kendo-mobile:app with custom settings', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .inDir(tempDir)
                .withOptions({})
                .withGenerators([path.join(__dirname, '../generators/view')])
                .withPrompts({
                    noNpm: true,
                    navigation: 'custom',
                    theme: 'bootstrap',
                    transition: 'zoom'
                })
                .on('end', done);
        });

        it('add custom navigation in index file', function () {
            assert.fileContent('app/index.html', new RegExp('<a class=\"nav-button km-widget km-button km-back\" data-align=\"left\" data-role=\"backbutton\" href=\"#:back\"><span class=\"km-text\">Back</span></a>'));
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

        it('add theme in app file', function () {
            assert.fileContent('app/scripts/app.js', new RegExp('skin: \'bootstrap\''));
        });

        it('add transition in app file', function () {
            assert.fileContent('app/scripts/app.js', new RegExp('transition: \'zoom\''));
        });
    });
});