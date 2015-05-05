'use strict';

var path = require('path'),
  watch = require('gulp-watch'),
  merge = require('lodash.merge'),
  patternImporter = require('pattern-importer').patternImporter,
  patternImporterUtils = require('pattern-importer').utils;


/**
 * Gulp task to watch raw pattern folders and convert to browser-ready html/css/js
 * @param {Object} [options] custom options
 * @param {Array,String} options.localPatternFiles  project-relative path to sets of un-compiled patterns
 * @param {Object}  options.patternImporterOptions  options needed for the pattern-importer
 * @requires NPM:Gulp
 * @requires NPM:Gulp-Watch
 * @requires NPM:lodash
 * @requires NPM:Pattern-Importer
 */
module.exports = function (gulp, projectOptions) {

  /* default options */
  var options = {
    localPatternFiles: ['./app/patterns-local/**/*','./app/templates'],
    patternImporterOptions: patternImporterUtils.getOptions()
  }

  /* merge project and default options */
  merge(options, projectOptions, function (a, b) {
    return Array.isArray(a) ? b : undefined;
  });

  /* gulp task to watch our designated pattern directories */
  gulp.task('patterns-watch', function() {

    watch(options.localPatternFiles, function (file) {
      
      var paths = patternImporterUtils.getFilePaths(file);
      var ymlFile = path.join(paths.folder,options.patternImporterOptions.dataFileName);

      gulp.src(ymlFile)
        .pipe(patternImporter());
    });

  })
}
