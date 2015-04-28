

Steps to begin

1. Install Atlas with `yo atlas`
  * [how to install Atlas](http://scottnath.github.io/atlas/installation/)
2. Grab the Pattern Library via bower
  * `bower install git@github.com:pattern-library/pattern-library.git --save`
3. Add the pattern-importer as a node module:

    ```
    npm install git+ssh://git@github.com:pattern-library/pattern-importer.git
    ```
4. Add the pattern-presenter as a node module:

    ```
    npm install git+ssh://git@github.com:pattern-library/pattern-presenter.git
    ```

4. Create a new gulp file `./app/_gulp/pattern-import.js`
5. Add the following code to `pattern-import.js`:

    ```
    /**
     *  @fileOverview Uses Gulpjs to grab html patterns
     *
     *  @author       Scott Nath
     *
     *  @requires     NPM:gulp
     *  @requires     NPM:js-yaml
     *  @requires     /gulp/config.js
     */
    'use strict';
    var gulp = require('gulp'),
        print = require('gulp-print'),
        patternImporter = require('pattern-importer');
    
    var pattFiles = ['./app/bower_components/pattern-library/patterns/**/pattern.yml'];
    
    gulp.task('pattern-import', function() {
      console.log('-------------------------------------------------- DEVELOPMENT: GRABBING HTML PATTERNS');
    
      return gulp.src(pattFiles)
        .pipe(print())
        .pipe(patternImporter());
    });
    ```

6. Import the patterns on the command line with:

    ```
    gulp pattern-import
    ```

7. Find your imported patterns in ./app/_patterns
