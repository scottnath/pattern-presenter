Pattern Presenter Gulp Tasks
---
---

Contains [Gulp](http://gulpjs.com) tasks which can be used to perform functions for the pattern presenter.

## Basic Usage

```
// gulpfile.js
var someTaskName = require('pattern-presenter').gulpSomeTaskName(optionsObject);
```

## Gulp Task: `patterns-watch`

Gulp task which sets up a watch (using [gulp-watch](https://www.npmjs.com/package/gulp-watch)) to watch for changes to a set of user-owned, local, non-compiled patterns. ie non-package-manager based patterns.

### Usage

In your `gulpfile.js`, in the requires at the top:
```
var gulp = require('gulp');
var options = {
	localPatternFiles: ['./relative/path/to/local/patterns','./some/other/pattern/directory']
}

require('pattern-presenter').gulpPatternsWatch(gulp,options)
```

### Options

```
var options = {
  localPatternFiles: ['./app/patterns-local/**/*','./app/templates'],
  patternImporterOptions: patternImporterUtils.getOptions()
}
```

#### localPatternFiles

project-relative path to sets of un-compiled patterns

#### patternImporterOptions

options for the [pattern-importer](https://github.com/scottnath/pattern-importer)


```

## Gulp Task: `patterns-menu`

Gulp task which creates a recursive-by-category menu with relative links to our compiled patterns.

### Usage

In your `gulpfile.js`, in the requires at the top:
```
var gulp = require('gulp');

var menuOptions = {
  src: './node_modules/pattern-presenter/node_modules/object-to-list/templates/menu.twig',
  dest: './app/PUBLIC/something.html'
}
require('pattern-presenter').gulpPatternsMenu(require('gulp'),menuOptions);
```

### Options

```
var options = {
  src: './node_modules/pattern-presenter/node_modules/object-to-list/templates/menu.twig',
  dest: './app/PUBLIC/something.html'
}
```

#### src

twig template for menu

#### dest

file which will be overwritten with the html menu
