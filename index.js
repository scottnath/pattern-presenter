'use strict';
var dir = require('node-dir'),
    yaml = require('js-yaml'),
    gutil = require('gulp-util');

var createPatternObject = require('./lib/create-pattern-object.js'),
    PLUGIN_NAME = 'pattern-importer';

var config = createPatternObject('../../app/_patterns', function (err, filesTree){
  if (err) throw err;

  //@TODO: generate menu tree using filesTree
  console.log(filesTree);
});

