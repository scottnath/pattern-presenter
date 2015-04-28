'use strict';
var dir = require('node-dir'),
  Promise = require('bluebird'),
  yaml = require('js-yaml'),
  gutil = require('gulp-util'),
  createPatternObject = require('./lib/create-pattern-object.js'),
  createPatternObjectPromise = Promise.promisifyAll(createPatternObject),
  PLUGIN_NAME = 'pattern-importer';

  // createPatternObjectPromise('../../app/_patterns')
  //   .then(function(resp){
  //     console.log('1stthen');
  //     return resp;
  //   })
  //   .then(function(){
  //     console.log('2ndthen');
  //     return filesTree;
  //   })
createPatternObject('../../app/_patterns', function (err, filesTree){
  if (err) throw err;

  //@TODO: generate menu tree using filesTree
  console.log('filesTree');
  console.log(filesTree);
});

