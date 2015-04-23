'use strict';
var dir = require('node-dir'),
    yaml = require('js-yaml'),
    gutil = require('gulp-util');

var createPatternObject = require('./lib/create-pattern-object.js'),
    PLUGIN_NAME = 'pattern-importer';

console.log(createPatternObject('./app/_patterns'));
