'use strict';
var dir = require('node-dir'),
  Promise = require('bluebird'),
  dir = Promise.promisifyAll(require('node-dir')),
  yaml = require('js-yaml'),
  gutil = require('gulp-util'),
  PLUGIN_NAME = 'pattern-importer';



  var filesTree = {
    categories: {}
  };

  var matchFiles = {
    match: /.yml$/,
    exclude: /^\./
  };
function process(err, content, next) {
    if (err) throw err;
    /* turn our yaml data into an object */

    var fileData = yaml.safeLoad(content);

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
      filesTree.categories['uncategorized'] = filesTree.categories['uncategorized'] || {
        patterns: []
      };

      if (fileData.subcategory) {
        filesTree.categories[fileData.category].subcategories[fileData.subcategory] = filesTree.categories[fileData.category].subcategories[fileData.subcategory] || {
          patterns: []
        };
      }
      else {
        filesTree.categories[fileData.category].patterns.push( {name: fileData.name, url: fileData.source} );
      }
    } else {
      filesTree.categories['uncategorized'].patterns.push( {name: fileData.name, url: fileData.source} );
    }
    next();
  }

  dir.readFilesAsync('../../app/_patterns', matchFiles, process)
    .then(function(resp){
      console.log('1stthen');
      console.log(resp);
      return resp;
    })
    .then(function(){
      console.log('2ndthen');
      return filesTree;
    })
