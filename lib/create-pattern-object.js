'use strict';
var dir = require('node-dir'),
  //Promise = require('bluebird'),
  fs = require('fs'),
  path = require('path'),
  yaml = require('js-yaml'),
  File = require('vinyl'),
  gutil = require('gulp-util'),
  PLUGIN_NAME = 'pattern-importer',
  patternImporterUtils = require('pattern-importer').utils,
  plUtils = require('pattern-library-utilities');


/*
 * Creates an object from a folder of compiled patterns
 * @module createPatternObject
 *
 * @param {Object} patternFolder
 */
function createPatternObject (patternFolder, callback) {
  if(patternFolder === undefined){
    throw new gutil.PluginError(PLUGIN_NAME, 'patternFolder is undefined. #fail');
  }

  var filesTree = {
    categories: {}
  };

  var matchFiles = {
    match: /.yml$/,
    exclude: /^\./
  };

  function process(err, content, filename, next) {
    if (err) throw err;
    /* turn our yaml data into an object */
    var fileData = yaml.safeLoad(content);

    if(!fileData){
      fileData = {};
    }


    var file = new File({
      path: filename
    });
    var paths = plUtils.getFilePaths(file);

    var htmlFile = path.join(paths.folder,paths.directory+'.html');

    htmlFile = htmlFile.replace('app/', '');

    if (fileData.category) {

      /**
       * @TODO: create category prototype rather than create objects in runtime, replace this code:
       * {
       * subcategories: {},
       * patterns: []
       *  }
       * by calling new Category contructor.
       *
       *
       * @type {*|{subcategories: {}, patterns: Array}}
       */

      filesTree.categories[fileData.category] = filesTree.categories[fileData.category] || {
        subcategories: {},
        patterns: []
      };

      if(fileData.subcategory){
        filesTree.categories[fileData.category].subcategories[fileData.subcategory] = filesTree.categories[fileData.category].subcategories[fileData.subcategory] || {
          patterns: []
        };
      }

      if (fileData.subcategory) {
        filesTree.categories[fileData.category].subcategories[fileData.subcategory].patterns.push( {name: fileData.name, url: htmlFile} );
      } else {
        filesTree.categories[fileData.category].patterns.push( {name: fileData.name, url: htmlFile} );
      }
    } else {
      filesTree.categories['uncategorized'].patterns.push( {name: fileData.name, url: htmlFile} );
    }
    next();
  }


  /* read through the folder and find all our compiled.yml files */

  /**
   * @TODO: put a promise to return here rather than execute callback
   */

  // dir.readFilesAsync(patternFolder, matchFiles, process)
  //   .then(function(resp){
  //     console.log('1stthen');
  //     return resp;
  //   })
  //   .then(function(){
  //     console.log('2ndthen');
  //     return filesTree;
  //   })

  dir.readFiles(patternFolder, matchFiles, process,
    function(err, files){
      callback(err, filesTree);
    });

}
function callback(err, filesTree) {
  if (err) throw err;
  return filesTree;
}


module.exports = createPatternObject;
