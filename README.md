

Steps to begin

1. Install Atlas with `yo atlas`
  * [how to install Atlas](http://scottnath.github.io/atlas/installation/)
2. Grab the Pattern Library via bower
  * `bower install git@github.com:pattern-library/pattern-library.git --save`
3. Install the Pattern Importer
  * isn't in NPM yet so...
  * clone the repo: `git clone git@github.com:pattern-library/pattern-importer.git node_modules/pattern-importer`
4. Install pattern importer npm modules
  `cd node_modules/pattern-importer/`
  `npm install`
4. Create a gulp task:

```
var pattFiles = ['./app/bower_components/pattern-library/patterns/**/pattern.yml'];
gulp.task('pattern-import', function() {
  console.log('-------------------------------------------------- DEVELOPMENT: GRABBING HTML PATTERNS');

  return gulp.src(pattFiles)
    .pipe(print())
    .pipe(patternImporter());
});
```
5. Run the gulp task
  `gulp pattern-import`
