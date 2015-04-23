'use strict';
var dir = require('node-dir'),
    yaml = require('js-yaml'),
    gutil = require('gulp-util'),
    PLUGIN_NAME = 'pattern-importer';
var Promise = require('es6-promise').Promise
  , state = {}
  ;
/*
 * Creates an object from a folder of compiled patterns
 * @module createPatternObject
 *
 * @param {Object} patternFolder
*/
var createPatternObject = function createPatternObject (patternFolder) {
  if(patternFolder === undefined){
    throw new gutil.PluginError(PLUGIN_NAME, 'patternFolder is undefined. #fail');
  }
  var filesObj = {
    categories: {}
  };
  /* read through the folder and find all our compiled.yml files */
  dir.readFiles(patternFolder, {
    match: /.yml$/,
    exclude: /^\./
    },
    function(err, content, next) {
      if (err) throw err;
      /* turn our yaml data into an object */

      var fileData = yaml.safeLoad(content);

      if(fileData.category){
        if(filesObj.categories[fileData.category] === undefined){
          filesObj.categories[fileData.category] = {
            subcategories: {},
            patterns: []
          };
        }
        var thisCat = filesObj.categories[fileData.category];

        if(fileData.subcategory){
          if(thisCat.subcategories[fileData.subcategory] === undefined){
            thisCat.subcategories[fileData.subcategory] = {
              patterns: []
            };
          }
          var thisCat = thisCat.subcategories[fileData.subcategory];
        }
        thisCat.patterns.push( {name: fileData.name, url: fileData.source} );
      } else {
        if(filesObj['uncategorized'] === undefined){
          filesObj['uncategorized'] = {
            patterns: []
          };
        }
        filesObj.categories.uncategorized.patterns.push( {name: fileData.name, url: fileData.source} );
      }
      next();
    },
    function(err, files){
      if (err) throw err;
      console.log(filesObj);
      return filesObj.categories;
    });

}

module.exports = createPatternObject;
