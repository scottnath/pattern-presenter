'use strict';

var path = require('path'),
  merge = require('lodash.merge'),
  menuLister = require('object-to-list'),
  createPatternObject = require('../lib/create-pattern-object');


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

  /* gulp task to watch our designated pattern directories */
  gulp.task('patterns-menu', function() {

    var options = {
      src: './node_modules/pattern-presenter/node_modules/object-to-list/templates/menu.twig',
      dest: './app/PUBLIC/menu.html'
    }

    /* merge project and default options */
    merge(options, projectOptions, function (a, b) {
      return Array.isArray(a) ? b : undefined;
    });

    createPatternObject('./app/PUBLIC', function (err, filesTree){
      if (err) throw err;

      menuLister(options.src, filesTree, options.dest);

    });

  })
}
